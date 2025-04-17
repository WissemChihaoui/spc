const menuData = [
  {
    label: "Tableau du board",
    icon: "ti ti-smart-home",
    href: "/institut/index.html",
  },
  {
    label: "Marques partenaires",
    icon: "ti ti-package",
    href: "/institut/index.html",
  },
  // {
  // label: 'SPA',
  // icon: 'ti ti-armchair-2',
  // children: [
  //     {
  //     label: 'Liste des spa',
  //     icon: 'ti ti-map-2',
  //     href: '/pages/spa/index.html',
  //     },
  //     {
  //     label: 'Catégories',
  //     icon: 'ti ti-box',
  //     href: '/pages/categories/index.html',
  //     },
  //     {
  //     label: 'Région ou ville',
  //     icon: 'ti ti-map-2',
  //     href: '/pages/region/index.html',
  //     },
  //     {
  //     label: 'Services et équipements',
  //     icon: 'ti ti-package',
  //     href: '/pages/services/index.html',
  //     },
  //     {
  //     label: 'Marques partenaire',
  //     icon: 'ti ti-package',
  //     href: '/pages/marques/index.html',
  //     },
  //     {
  //     label: 'Types d\'établissement',
  //     icon: 'ti ti-building',
  //     href: '/pages/types/index.html',
  //     },
  //     {
  //     label: 'Spas mis en avant',
  //     icon: 'ti ti-arrows-sort',
  //     href: '/pages/order/index.html',
  //     },
  // ]
  // },
  {
    label: "Votre SPA",
    icon: "ti ti-settings-cog",
    children: [
        {
            label: "Vos informations",
            icon: "ti ti-settings-cog",
            href: "/institut/me",
        },
        {
            label: "Carte de soins",
            icon: "ti ti-settings-cog",
            href: "/institut/me/carte.html",
        },
    ],
  },
  {
    label: "Fréquentation",
    icon: "ti ti-chart-line",
    href: "/institut/freq/index.html",
  },
  // {
  // label: 'FAQ',
  // icon: 'ti ti-help-octagon',
  // href: '/institut/faq/index.html',
  // },
  {
    label: "Emploi/CVthèque",
    icon: "ti ti-briefcase",
    href: "/institut/jobs/index.html",
  },
  {
    label: "Petites Annonces",
    icon: "ti ti-speakerphone",
    href: "/institut/annonce/index.html",
  },
  {
    label: "Forum",
    icon: "ti ti-at",
    href: "/institut/forum/index.html",
  },
  {
    label: "Satisfaction clients",
    icon: "ti ti-mood-happy",
    children: [
      {
        label: "Liste des clients",
        icon: "ti ti-map-2",
        href: "/institut/satisfaction/index.html",
      },
      {
        label: "Avis clients",
        icon: "ti ti-map-2",
        href: "/institut/satisfaction/avis.html",
      },
      {
        label: "Particiennes",
        icon: "ti ti-map-2",
        href: "/institut/satisfaction/particien.html",
      },
      {
        label: "Equipements",
        icon: "ti ti-map-2",
        href: "/institut/satisfaction/equipement.html",
      },
      {
        label: "Statistiques",
        icon: "ti ti-map-2",
        href: "/institut/satisfaction/stat.html",
      },
      {
        label: "Gérer les questions",
        icon: "ti ti-map-2",
        href: "/institut/satisfaction/questions.html",
      },
      {
        label: "Widget avis client",
        icon: "ti ti-map-2",
        href: "/institut/satisfaction/stat.html",
      },
    ],
  },
];

function generateMenu(menuItems) {
  const currentPath = window.location.pathname;

  function createMenuList(items, isSub = false) {
    const ul = document.createElement("ul");
    ul.className = isSub ? "menu-sub" : "menu-inner py-1";

    items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "menu-item";

      const hasChildren = item.children && item.children.length > 0;
      const a = document.createElement("a");
      a.className = "menu-link" + (hasChildren ? " menu-toggle" : "");
      a.href = item.href || "javascript:void(0)";

      // Set icon and label
      a.innerHTML = `
            <i class="menu-icon tf-icons ${item.icon}"></i>
            <div>${item.label}</div>
            `;

      // Add active and open classes
      if (item.href && item.href === currentPath) {
        li.classList.add("active");
        let parent = li.closest(".menu-sub");
        while (parent) {
          const parentItem = parent.closest(".menu-item");
          if (parentItem) {
            parentItem.classList.add("open");
          }
          parent = parentItem ? parentItem.closest(".menu-sub") : null;
        }
      }

      li.appendChild(a);

      if (hasChildren) {
        const subMenu = createMenuList(item.children, true);
        li.appendChild(subMenu);

        // If one of the children is active, open the parent
        if (item.children.some((child) => child.href === currentPath)) {
          li.classList.add("open");
        }
      }

      ul.appendChild(li);
    });

    return ul;
  }

  const menuContainer = document.getElementById("menu-container");
  menuContainer.innerHTML = "";
  menuContainer.appendChild(createMenuList(menuItems));
}

document.addEventListener("DOMContentLoaded", () => {
  generateMenu(menuData);
});
