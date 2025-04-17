/**
 * App eCommerce customer all
 */

'use strict';

// Datatable (jquery)
$(function () {
  let borderColor, bodyBg, headingColor;

  if (isDarkStyle) {
    borderColor = config.colors_dark.borderColor;
    bodyBg = config.colors_dark.bodyBg;
    headingColor = config.colors_dark.headingColor;
  } else {
    borderColor = config.colors.borderColor;
    bodyBg = config.colors.bodyBg;
    headingColor = config.colors.headingColor;
  }

  // Variable declaration for table
  var dt_customer_table = $('.datatables-customers'),
    select2 = $('.select2'),
    customerView = 'app-ecommerce-customer-details-overview.html';
  if (select2.length) {
    var $this = select2;
    $this.wrap('<div class="position-relative"></div>').select2({
      placeholder: 'United States ',
      dropdownParent: $this.parent()
    });
  }

  // customers datatable
  if (dt_customer_table.length) {
    var dt_customer = dt_customer_table.DataTable({
      ajax: assetsPath + 'json/ecommerce-customer-all.json',
      columns: [
        { data: null }, // For control/expand (if needed)
        { data: null }, // For checkbox
        { data: null }, // For actions
        { data: 'customer' }, // Client (Name + Email)
        { data: 'customer_id' }, // Téléphone (You can rename later)
        { data: 'questionnaire' } // Questionnaire
      ],
      columnDefs: [
        {
          className: 'control',
          searchable: false,
          orderable: false,
          responsivePriority: 1,
          targets: 0,
          render: () => ''
        },
        {
          targets: 1,
          orderable: false,
          searchable: false,
          checkboxes: true,
          render: () => '<input type="checkbox" class="dt-checkboxes form-check-input">',
          checkboxes: {
            selectAllRender: '<input type="checkbox" class="form-check-input">'
          }
        },
        {
          targets: 2,
          searchable: false,
          orderable: false,
          render: (data, type, full) => `
            <div class="d-flex align-items-center ">
              <button class="btn btn-sm btn-icon delete-record me-2"><i class="ti ti-trash"></i></button>
              <a href="javascript:void(0);" class="btn btn-sm btn-icon"><i class="ti ti-edit"></i></a>
            </div>
          `
        },
        {
          targets: 3,
          render: (data, type, full) => {
            let name = full['customer'],
                email = full['email'],
                image = full['image'],
                avatar = image
                  ? `<div class="avatar me-2"><img src="${assetsPath}img/avatars/${image}" alt="Avatar" class="rounded-circle"></div>`
                  : `<span class="rounded-circle bg-label-primary">${(name.match(/\b\w/g) || []).join('').toUpperCase()}</span>`;
  
            return `
              <div class="d-flex align-items-center customer-name">
                <div class="avatar-wrapper">${avatar}</div>
                <div class="d-flex flex-column">
                  <span class="fw-medium">${name}</span>
                  <small class="text-muted">${email}</small>
                </div>
              </div>`;
          }
        },
        {
          targets: 4,
          render: (data, type, full) => `<a href="tel:${full['customer_id']}">${full['customer_id']}</a>` // Téléphone
        },
        {
          targets: 5,
          render: (data, type, full) => `<span>${full['questionnaire'] || '-'}</span>`
        }
      ],
      order: [[3, 'asc']],
      dom:
        '<"card-header d-flex flex-wrap pb-md-2"' +
        '<"d-flex align-items-center me-5"f>' +
        '<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-md-end gap-3 gap-sm-0 flex-wrap flex-sm-nowrap"lB>' +
        '>t' +
        '<"row mx-2"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
        language: {
          sEmptyTable: "Aucune donnée disponible dans le tableau",
          sInfo: "Affichage de _START_ à _END_ sur _TOTAL_ entrées",
          sInfoEmpty: "Affichage de 0 à 0 sur 0 entrées",
          sInfoFiltered: "(filtré à partir de _MAX_ entrées au total)",
          sInfoPostFix: "",
          sInfoThousands: ",",
          sLengthMenu: "Afficher _MENU_ entrées",
          sLoadingRecords: "Chargement...",
          sProcessing: "Traitement...",
          sSearch: "Rechercher :",
          sZeroRecords: "Aucun enregistrement correspondant trouvé",
          oPaginate: {
            sFirst: "Premier",
            sLast: "Dernier",
            sNext: "Suivant",
            sPrevious: "Précédent"
          },
          oAria: {
            sSortAscending: ": activer pour trier la colonne par ordre croissant",
            sSortDescending: ": activer pour trier la colonne par ordre décroissant"
          },
          buttons: {
            copy: "Copier",
            csv: "CSV",
            excel: "Excel",
            pdf: "PDF",
            print: "Imprimer",
            colvis: "Visibilité des colonnes",
            collection: "Collection",
            upload: "Téléverser"
          }
        },
      buttons: [
        {
          extend: 'collection',
          className: 'btn btn-label-secondary dropdown-toggle me-3',
          text: '<i class="ti ti-download me-1"></i>Exporter',
          buttons: [
            {
              extend: 'print',
              text: '<i class="ti ti-printer me-2"></i>Imprimer',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4, 5] }
            },
            {
              extend: 'csv',
              text: '<i class="ti ti-file me-2"></i>CSV',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4, 5] }
            },
            {
              extend: 'excel',
              text: '<i class="ti ti-file-export me-2"></i>Excel',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4, 5] }
            },
            {
              extend: 'pdf',
              text: '<i class="ti ti-file-text me-2"></i>PDF',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4, 5] }
            }
          ]
        },
        {
          text: '<i class="ti ti-plus ti-xs me-0 me-sm-2"></i><span class="d-none d-sm-inline-block">Ajouter Client</span>',
          className: 'add-new btn btn-primary ms-2',
          attr: {
            'data-bs-toggle': 'offcanvas',
            'data-bs-target': '#offCanvasAddClient'
          },
        }
      ]
    });
  }
  

  // Delete Record
  $('.datatables-customers tbody').on('click', '.delete-record', function () {
    dt_customer.row($(this).parents('tr')).remove().draw();
  });

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);
});

// Validation & Phone mask
(function () {
  const phoneMaskList = document.querySelectorAll('.phone-mask'),
    eCommerceCustomerAddForm = document.getElementById('eCommerceCustomerAddForm');

  // Phone Number
  if (phoneMaskList) {
    phoneMaskList.forEach(function (phoneMask) {
      new Cleave(phoneMask, {
        phone: true,
        phoneRegionCode: 'US'
      });
    });
  }
  // Add New customer Form Validation
  const fv = FormValidation.formValidation(eCommerceCustomerAddForm, {
    fields: {
      customerName: {
        validators: {
          notEmpty: {
            message: 'Please enter fullname '
          }
        }
      },
      customerEmail: {
        validators: {
          notEmpty: {
            message: 'Please enter your email'
          },
          emailAddress: {
            message: 'The value is not a valid email address'
          }
        }
      }
    },
    plugins: {
      trigger: new FormValidation.plugins.Trigger(),
      bootstrap5: new FormValidation.plugins.Bootstrap5({
        // Use this for enabling/changing valid/invalid class
        eleValidClass: '',
        rowSelector: function (field, ele) {
          // field is the field name & ele is the field element
          return '.mb-3';
        }
      }),
      submitButton: new FormValidation.plugins.SubmitButton(),
      // Submit the form when all fields are valid
      // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      autoFocus: new FormValidation.plugins.AutoFocus()
    }
  });
})();
