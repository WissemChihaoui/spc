/**
 * App Invoice - Add
 */

"use strict";

$(function () {
  const serviceTypesEl = document.querySelector("#serviceTypes"),
        marquePartenaireEL = document.querySelector("#marquePartenaire");

  function tagTemplate(tagData) {
    return `
      <tag title="${tagData.label}"
        contenteditable='false'
        spellcheck='false'
        tabIndex="-1"
        class="${
          this.settings.classNames.tag
        } ${tagData.class ? tagData.class : ""}"
        ${this.getAttributes(tagData)}
      >
        <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>
        <div>
          <div style='border-radius: 0%' class='tagify__tag__avatar-wrap'>
            <img onerror="this.style.visibility='hidden'" src="${
              tagData.icon || ""
            }">
          </div>
          <span class='tagify__tag-text'>${tagData.label || tagData.name}</span>
        </div>
      </tag>
    `;
  }

  function suggestionItemTemplate(tagData) {
    return `
      <div ${this.getAttributes(tagData)}
        class='tagify__dropdown__item align-items-center ${
          tagData.class ? tagData.class : ""
        }'
        tabindex="0"
        role="option"
      >
        ${
          tagData.icon
            ? `<div style='border-radius: 0%' class='tagify__dropdown__item__avatar-wrap'>
                <img onerror="this.style.visibility='hidden'" src="${tagData.icon}">
              </div>`
            : ""
        }
        <div class="fw-medium">${tagData.label || tagData.name}</div>
      </div>
    `;
  }

  function dropdownHeaderTemplate(suggestions) {
    return `
      <div class="${
        this.settings.classNames.dropdownItem
      } ${this.settings.classNames.dropdownItem}__addAll">
        <strong>${
          this.value.length ? "Ajouter le reste" : "Ajouter tous"
        }</strong>
        <span>${
          suggestions.length
        } ${suggestions.length === 1 ? "équipement" : "équipements"}</span>
      </div>
    `;
  }

  const whitelistIcons = [
    {
      value: 1,
      label: "Sauna",
      icon: "/assets/img/spa-icons/sauna.png",
    },
    {
      value: 2,
      label: "Piscine",
      icon: "/assets/img/spa-icons/pool.png",
    },
    {
      value: 3,
      label: "Hammam",
      icon: "/assets/img/spa-icons/drops.png",
    },
  ];


  let TagifyUserList = new Tagify(serviceTypesEl, {
    tagTextProp: "name", // very important since a custom template is used with this property as text. allows typing a "value" or a "name" to match input with whitelist
    enforceWhitelist: true,
    skipInvalid: true, // do not remporarily add invalid tags
    dropdown: {
      closeOnSelect: false,
      enabled: 0,
      classname: "users-list",
      searchKeys: ["label"], // very important to set by which keys to search for suggesttions when typing
    },
    templates: {
      tag: tagTemplate,
      dropdownItem: suggestionItemTemplate,
      dropdownHeader: dropdownHeaderTemplate,
    },
    whitelist: whitelistIcons,
  });

  // attach events listeners
  TagifyUserList.on("dropdown:select", onSelectSuggestion) // allows selecting all the suggested (whitelist) items
    .on("edit:start", onEditStart); // show custom text in the tag while in edit-mode

  function onSelectSuggestion(e) {
    // custom class from "dropdownHeaderTemplate"
    if (
      e.detail.elm.classList.contains(
        `${TagifyUserList.settings.classNames.dropdownItem}__addAll`
      )
    )
      TagifyUserList.dropdown.selectAll();
  }

  function onEditStart({ detail: { tag, data } }) {
    TagifyUserList.setTagTextNode(tag, `${data.name} `);
  }
const whitelistPartners = [
  {
    value: 1,
    label: "L'Oréal",
    icon: "/assets/img/spa-icons/drops.png",
  },
  {
    value: 2,
    label: "Yves Rocher",
    icon: "/assets/img/spa-icons/drops.png",
  },
  {
    value: 3,
    label: "Nuxe",
    icon: "/assets/img/spa-icons/drops.png",
  },
];
  let TagifyPartnerList = new Tagify(marquePartenaireEL, {
    tagTextProp: "name",
    enforceWhitelist: true,
    skipInvalid: true,
    dropdown: {
      closeOnSelect: false,
      enabled: 0,
      classname: "users-list",
      searchKeys: ["label"],
    },
    templates: {
      tag: tagTemplate,
      dropdownItem: suggestionItemTemplate,
      dropdownHeader: dropdownHeaderTemplate,
    },
    whitelist: whitelistPartners, // or use a different list like `whitelistPartners`
  });
  
  // attach events listeners
  TagifyPartnerList.on("dropdown:select", onSelectSuggestionPartner)
                   .on("edit:start", onEditStartPartner);
  
  function onSelectSuggestionPartner(e) {
    if (
      e.detail.elm.classList.contains(
        `${TagifyPartnerList.settings.classNames.dropdownItem}__addAll`
      )
    )
      TagifyPartnerList.dropdown.selectAll();
  }
  
  function onEditStartPartner({ detail: { tag, data } }) {
    TagifyPartnerList.setTagTextNode(tag, `${data.name} `);
  }
});

$(function () {
  const previewTemplate = `<div class="dz-preview dz-file-preview">
<div class="dz-details">
  <div class="dz-thumbnail">
    <img data-dz-thumbnail>
    <span class="dz-nopreview">No preview</span>
    <div class="dz-success-mark"></div>
    <div class="dz-error-mark"></div>
    <div class="dz-error-message"><span data-dz-errormessage></span></div>
    <div class="progress">
      <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
    </div>
  </div>
  <div class="dz-filename" data-dz-name></div>
  <div class="dz-size" data-dz-size></div>
</div>
</div>`;

  const dropzoneMulti = document.querySelector("#dropzone-multi");
  if (dropzoneMulti) {
    const myDropzoneMulti = new Dropzone(dropzoneMulti, {
      previewTemplate: previewTemplate,
      parallelUploads: 1,
      maxFilesize: 5,
      addRemoveLinks: true,
    });
  }

  const flatpickrRange = document.querySelector("#flatpickr-range");

  // Range
  if (typeof flatpickrRange != undefined) {
    flatpickrRange.flatpickr({
      mode: "range",
      locale: "fr"
    });
  }
})
$(function () {
  const invoiceItemPriceList = document.querySelectorAll(".invoice-item-price"),
    invoiceItemQtyList = document.querySelectorAll(".invoice-item-qty"),
    invoiceDateList = document.querySelectorAll(".date-picker");

  // Price
  if (invoiceItemPriceList) {
    invoiceItemPriceList.forEach(function (invoiceItemPrice) {
      new Cleave(invoiceItemPrice, {
        delimiter: "",
        numeral: true,
      });
    });
  }

  // Qty
  if (invoiceItemQtyList) {
    invoiceItemQtyList.forEach(function (invoiceItemQty) {
      new Cleave(invoiceItemQty, {
        delimiter: "",
        numeral: true,
      });
    });
  }

  // Datepicker
  if (invoiceDateList) {
    invoiceDateList.forEach(function (invoiceDateEl) {
      invoiceDateEl.flatpickr({
        monthSelectorType: "static",
      });
    });
  }

  //  Avatar
  let accountUserImage = document.getElementById("uploadedAvatar");
  const fileInput = document.querySelector(".account-file-input"),
    resetFileInput = document.querySelector(".account-image-reset");

  if (accountUserImage) {
    const resetImage = accountUserImage.src;
    fileInput.onchange = () => {
      if (fileInput.files[0]) {
        accountUserImage.src = window.URL.createObjectURL(fileInput.files[0]);
      }
    };
    resetFileInput.onclick = () => {
      fileInput.value = "";
      accountUserImage.src = resetImage;
    };
  }
});

$(function () {
  const sourceItem = $(".source-item");

  // Handle file input and preview per repeater item
  $(document).on("change", ".account-file-input", function () {
    const previewImg = $(this).closest("label").find(".preview-img")[0];
    if (this.files && this.files[0]) {
      previewImg.src = URL.createObjectURL(this.files[0]);
    }
  });

  // Initialize the repeater
  if (sourceItem.length) {
    sourceItem.repeater({
      show: function () {
        $(this).slideDown();
      },
      hide: function (deleteElement) {
        $(this).slideUp(deleteElement);
      },
    });

    // Prevent default submit
    sourceItem.on("submit", function (e) {
      e.preventDefault();
    });
  }

  // Optional: Set default textarea values based on item selection
  const adminDetails = {
    "App Design": "Designed UI kit & app pages.",
    "App Customization": "Customization & Bug Fixes.",
    "ABC Template": "Bootstrap 4 admin template.",
    "App Development": "Native App Development.",
  };

  $(document).on("change", ".item-details", function () {
    const value = adminDetails[$(this).val()];
    if (value) {
      $(this).siblings("textarea").val(value);
    }
  });

  // Apply changes button inside dropdown
  $(document).on("click", ".btn-apply-changes", function () {
    const container = $(this).closest(".repeater-wrapper");
    const prixBarre = container.find("#prixBarre").val();
    const prixLieu = container.find("#prixLieu").val();
    // You can now use these values where needed
    console.log("Prix barré:", prixBarre, "| Prix du lieu:", prixLieu);
  });
});



$(document).ready(function () {
  $("#partenaireForm").repeater({
    initEmpty: false,
    defaultValues: {
      name: "",
      poste: "",
      description: "",
    },
    show: function () {
      $(this).slideDown();
    },
    hide: function (deleteElement) {
      $(this).slideUp(deleteElement);
    },
  });

  // Optional image preview
  $(document).on("change", ".account-file-input", function () {
    const input = this;
    const reader = new FileReader();
    reader.onload = function (e) {
      $(input)
        .closest("label")
        .find(".preview-img")
        .attr("src", e.target.result);
    };
    if (input.files[0]) {
      reader.readAsDataURL(input.files[0]);
    }
  });
});
