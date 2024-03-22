"""

 OMRChecker

 Author: Udayraj Deshmukh
 Github: https://github.com/Udayraj123

"""
import os
from csv import QUOTE_NONNUMERIC
from pathlib import Path
from time import time

import cv2
import pandas as pd
from rich.table import Table

from src import constants
from src.defaults import CONFIG_DEFAULTS
from src.evaluation import EvaluationConfig, evaluate_concatenated_response
from src.logger import console, logger
from src.template import Template
from src.utils.file import Paths, setup_dirs_for_paths, setup_outputs_for_template
from src.utils.image import ImageUtils
from src.utils.interaction import InteractionUtils, Stats
from src.utils.parsing import get_concatenated_response, open_config_with_defaults

# Load processors
STATS = Stats()


def entry_point(input_dir, args):
    if not os.path.exists(input_dir):
        raise Exception(f"Thư mục đầu vào đã cho không tồn tại: '{input_dir}'")
    curr_dir = input_dir
    return process_dir(input_dir, curr_dir, args)


def print_config_summary(
    curr_dir,
    omr_files,
    template,
    tuning_config,
    local_config_path,
    evaluation_config,
    args,
):
    logger.info("")
    table = Table(title="Cấu hình hiện tại", show_header=False, show_lines=False)
    table.add_column("Key", style="cyan", no_wrap=True)
    table.add_column("Value", style="magenta")
    table.add_row("Đường dẫn thư mục", f"{curr_dir}")
    table.add_row("Số lượng hình ảnh", f"{len(omr_files)}")
    table.add_row("Đặt chế độ bố cục", "ON" if args["setLayout"] else "OFF")
    table.add_row(
        "Phát hiện điểm đánh dấu",
        "ON" if "CropOnMarkers" in template.pre_processors else "OFF",
    )
    table.add_row("Tự động căn chỉnh", f"{tuning_config.alignment_params.auto_align}")
    table.add_row("Đường dẫn mẫu tập tin", f"{template}")
    if local_config_path:
        table.add_row("Cấu hình mẫu tập tin", f"{local_config_path}")
    if evaluation_config:
        table.add_row("Kiểm tra mẫu tập tin", f"{evaluation_config}")

    table.add_row(
        "Phát hiện bộ xử lý",
        f"{[pp.__class__.__name__ for pp in template.pre_processors]}",
    )
    console.print(table, justify="center")


def process_dir(
    root_dir,
    curr_dir,
    args,
    template=None,
    tuning_config=CONFIG_DEFAULTS,
    evaluation_config=None,
):
    # Update local tuning_config (in current recursion stack)
    local_config_path = curr_dir.joinpath(constants.CONFIG_FILENAME)
    if os.path.exists(local_config_path):
        tuning_config = open_config_with_defaults(local_config_path)

    # Update local template (in current recursion stack)
    local_template_path = curr_dir.joinpath(constants.TEMPLATE_FILENAME)
    local_template_exists = os.path.exists(local_template_path)
    if local_template_exists:
        template = Template(
            local_template_path,
            tuning_config,
        )
    # Look for subdirectories for processing
    subdirs = [d for d in curr_dir.iterdir() if d.is_dir()]

    output_dir = Path(args["output_dir"], curr_dir.relative_to(root_dir))
    paths = Paths(output_dir)

    # look for images in current dir to process
    exts = ("*.[pP][nN][gG]", "*.[jJ][pP][gG]", "*.[jJ][pP][eE][gG]")
    omr_files = sorted([f for ext in exts for f in curr_dir.glob(ext)])

    # Exclude images (take union over all pre_processors)
    excluded_files = []
    if template:
        for pp in template.pre_processors:
            excluded_files.extend(Path(p) for p in pp.exclude_files())

    local_evaluation_path = curr_dir.joinpath(constants.EVALUATION_FILENAME)
    if not args["setLayout"] and os.path.exists(local_evaluation_path):
        if not local_template_exists:
            logger.warning(
                f"Đã tìm thấy tệp đánh giá không có tệp mẫu gốc: {local_evaluation_path}"
            )
        evaluation_config = EvaluationConfig(
            curr_dir,
            local_evaluation_path,
            template,
            tuning_config,
        )

        excluded_files.extend(
            Path(exclude_file) for exclude_file in evaluation_config.get_exclude_files()
        )

    omr_files = [f for f in omr_files if f not in excluded_files]

    if omr_files:
        if not template:
            logger.error(
                f"Tìm thấy hình ảnh nhưng không có mẫu trong cây thư mục \
                của '{curr_dir}'. \nPlace {constants.TEMPLATE_FILENAME} bên trong \
                thư mục thích hợp."
            )
            raise Exception(
                f"Không tìm thấy tệp mẫu trong cây thư mục của {curr_dir}"
            )

        setup_dirs_for_paths(paths)
        outputs_namespace = setup_outputs_for_template(paths, template)

        print_config_summary(
            curr_dir,
            omr_files,
            template,
            tuning_config,
            local_config_path,
            evaluation_config,
            args,
        )
        if args["setLayout"]:
            show_template_layouts(omr_files, template, tuning_config)
        else:
            process_files(
                omr_files,
                template,
                tuning_config,
                evaluation_config,
                outputs_namespace,
            )

    elif not subdirs:
        # Each subdirectory should have images or should be non-leaf
        logger.info(
            f"Không tìm thấy hình ảnh hoặc thư mục con hợp lệ trong {curr_dir}.\
            Thư mục trống không được phép."
        )

    # recursively process sub-folders
    for d in subdirs:
        process_dir(
            root_dir,
            d,
            args,
            template,
            tuning_config,
            evaluation_config,
        )


def show_template_layouts(omr_files, template, tuning_config):
    for file_path in omr_files:
        file_name = file_path.name
        file_path = str(file_path)
        in_omr = cv2.imread(file_path, cv2.IMREAD_GRAYSCALE)
        in_omr = template.image_instance_ops.apply_preprocessors(
            file_path, in_omr, template
        )
        template_layout = template.image_instance_ops.draw_template_layout(
            in_omr, template, shifted=False, border=2
        )
        InteractionUtils.show(
            f"Bố cục mẫu: {file_name}", template_layout, 1, 1, config=tuning_config
        )


def process_files(
    omr_files,
    template,
    tuning_config,
    evaluation_config,
    outputs_namespace,
):
    start_time = int(time())
    files_counter = 0
    STATS.files_not_moved = 0

    for file_path in omr_files:
        files_counter += 1
        file_name = file_path.name

        in_omr = cv2.imread(str(file_path), cv2.IMREAD_GRAYSCALE)

        logger.info("")
        logger.info(
            f"({files_counter}) Hình ảnh được mở: \t'{file_path}'\tKích cỡ: {in_omr.shape}"
        )

        template.image_instance_ops.reset_all_save_img()

        template.image_instance_ops.append_save_img(1, in_omr)

        in_omr = template.image_instance_ops.apply_preprocessors(
            file_path, in_omr, template
        )

        if in_omr is None:
            # Error OMR case
            new_file_path = outputs_namespace.paths.errors_dir.joinpath(file_name)
            outputs_namespace.OUTPUT_SET.append(
                [file_name] + outputs_namespace.empty_resp
            )
            if check_and_move(
                constants.ERROR_CODES.NO_MARKER_ERR, file_path, new_file_path
            ):
                err_line = [
                    file_name,
                    file_path,
                    new_file_path,
                    "NA",
                ] + outputs_namespace.empty_resp
                pd.DataFrame(err_line, dtype=str).T.to_csv(
                    outputs_namespace.files_obj["Errors"],
                    mode="a",
                    quoting=QUOTE_NONNUMERIC,
                    header=False,
                    index=False,
                )
            continue

        # uniquify
        file_id = str(file_name)
        save_dir = outputs_namespace.paths.save_marked_dir
        (
            response_dict,
            final_marked,
            multi_marked,
            _,
        ) = template.image_instance_ops.read_omr_response(
            template, image=in_omr, name=file_id, save_dir=save_dir
        )

        # TODO: move inner try catch here
        # concatenate roll nos, set unmarked responses, etc
        omr_response = get_concatenated_response(response_dict, template)

        if (
            evaluation_config is None
            or not evaluation_config.get_should_explain_scoring()
        ):
            logger.info(f"Đọc kết quả: {omr_response}")

        score = 0
        if evaluation_config is not None:
            score = evaluate_concatenated_response(omr_response, evaluation_config)
            logger.info(
                f"(/{files_counter}) Được xếp loại theo điểm: {round(score, 2)}\t cho tập tin: '{file_id}'"
            )
        else:
            logger.info(f"({files_counter}) Hình ảnh được xử lý: '{file_id}'")

        if tuning_config.outputs.show_image_level >= 2:
            InteractionUtils.show(
                f"Hinh anh sau khi quet : {file_id}",
                ImageUtils.resize_util_h(
                    final_marked, int(tuning_config.dimensions.display_height)
                ),
                1,
                1,
                config=tuning_config,
            )

        resp_array = []
        for k in template.output_columns:
            resp_array.append(omr_response[k])

        outputs_namespace.OUTPUT_SET.append([file_name] + resp_array)

        if multi_marked == 0 or not tuning_config.outputs.filter_out_multimarked_files:
            STATS.files_not_moved += 1
            new_file_path = save_dir.joinpath(file_id)
            # Enter into Results sheet-
            results_line = [file_name, file_path, new_file_path, score] + resp_array
            # Write/Append to results_line file(opened in append mode)
            pd.DataFrame(results_line, dtype=str).T.to_csv(
                outputs_namespace.files_obj["Results"],
                mode="a",
                quoting=QUOTE_NONNUMERIC,
                header=False,
                index=False,
            )
        else:
            # multi_marked file
            logger.info(f"[{files_counter}] Tìm thấy tập tin nhiều dấu: '{file_id}'")
            new_file_path = outputs_namespace.paths.multi_marked_dir.joinpath(file_name)
            if check_and_move(
                constants.ERROR_CODES.MULTI_BUBBLE_WARN, file_path, new_file_path
            ):
                mm_line = [file_name, file_path, new_file_path, "NA"] + resp_array
                pd.DataFrame(mm_line, dtype=str).T.to_csv(
                    outputs_namespace.files_obj["MultiMarked"],
                    mode="a",
                    quoting=QUOTE_NONNUMERIC,
                    header=False,
                    index=False,
                )
            # else:
            #     TODO:  Add appropriate record handling here
            #     pass

    print_stats(start_time, files_counter, tuning_config)


def check_and_move(error_code, file_path, filepath2):
    # TODO: fix file movement into error/multimarked/invalid etc again
    STATS.files_not_moved += 1
    return True


def print_stats(start_time, files_counter, tuning_config):
    time_checking = max(1, round(time() - start_time, 2))
    log = logger.info
    log("")
    log(f"{'Tổng số tệp đã được di chuyển':<27}: {STATS.files_moved}")
    log(f"{'Tổng số tệp không được di chuyển':<27}: {STATS.files_not_moved}")
    log("--------------------------------")
    log(
        f"{'Tổng số tệp được xử lý':<27}: {files_counter} ({'Tổng số đã được tính !' if files_counter == (STATS.files_moved + STATS.files_not_moved) else 'Không kiểm đếm !'})"
    )

    if tuning_config.outputs.show_image_level <= 0:
        log(
            f"\nKiểm tra xong {files_counter} tập tin trong {round(time_checking, 1)} giây ~{round(time_checking/60, 1)} phuý(s)."
        )
        log(
            f"{'Tốc độ xử lý OMR':<27}:\t ~ {round(time_checking/files_counter,2)} giây/OMR"
        )
        log(
            f"{'Tốc độ xử lý OMR':<27}:\t ~ {round((files_counter * 60) / time_checking, 2)} OMRs/phút"
        )
    else:
        log(f"\n{'Tổng thời gian kịch bản':<27}: {time_checking} giây")

    # if tuning_config.outputs.show_image_level <= 1:
    #     log(
    #         "\nMẹo: Để xem một số hình ảnh tuyệt vời, hãy mở config.json và tăng 'show_image_level'"
    #     )
