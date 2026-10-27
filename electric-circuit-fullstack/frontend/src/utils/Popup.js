import Swal from "sweetalert2";

export const successPopup = (title, text = "") => {
    return Swal.fire({
        icon: "success",
        title,
        text,
        timer: 1500,
        showConfirmButton: false,
        timerProgressBar: true
    });
};

export const errorPopup = (title, text = "") => {
    return Swal.fire({
        icon: "error",
        title,
        text,
        confirmButtonColor: "#dc3545"
    });
};

export const warningPopup = (title, text = "") => {
    return Swal.fire({
        icon: "warning",
        title,
        text,
        confirmButtonColor: "#f39c12"
    });
};
export const confirmPopup = async (title, text = "") => {

    const result = await Swal.fire({

        icon: "question",

        title,

        text,

        showCancelButton: true,

        confirmButtonText: "Yes",

        cancelButtonText: "Cancel",

        confirmButtonColor: "#198754",

        cancelButtonColor: "#dc3545",

        reverseButtons: true

    });

    return result.isConfirmed;

};
