import { openModal, closeModal } from "./modal.mjs";
import {
  loadViewProductDetails,
  clearViewProductDetails,
} from "./productDetails.mjs";

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("openModalBtn")) {
      loadViewProductDetails(event.target.id);
      openModal("viewProductModal");
    } else if (event.target.classList.contains("close")) {
      closeModal("viewProductModal");
      clearViewProductDetails();
    } else {
      const modal = document.getElementById("viewProductModal");
      if (modal && event.target === modal) {
        closeModal("viewProductModal");
        clearViewProductDetails();
      }
    }
  });
});
