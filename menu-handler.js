const menuData = [
    {
      label: 'Tableau du board',
      icon: 'ti ti-smart-home',
      href: '/index.html',
    },
    {
      label: 'SPA',
      icon: 'ti ti-armchair-2',
      children: [
        {
          label: 'Liste des spa',
          icon: 'ti ti-map-2',
          href: '/pages/spa/index.html',
        },
        {
          label: 'Catégories',
          icon: 'ti ti-box',
          href: '/pages/categories/index.html',
        },
        {
          label: 'Région ou ville',
          icon: 'ti ti-map-2',
          href: '/pages/region/index.html',
        },
        {
          label: 'Services et équipements',
          icon: 'ti ti-package',
          href: '/pages/services/index.html',
        },
        {
          label: 'Types d\'établissement',
          icon: 'ti ti-building',
          href: '/pages/types/index.html',
        },
        {
          label: 'Spas mis en avant',
          icon: 'ti ti-arrows-sort',
          href: '/pages/order/index.html',
        },
      ]
    },
    {
      label: 'Carte cadeau',
      icon: 'ti ti-gift-card',
      href: '/pages/cadeaux/index.html',
    },
    {
      label: 'Blog',
      icon: 'ti ti-article',
      href: '/pages/blog/index.html',
    },
    {
      label: 'FAQ',
      icon: 'ti ti-help-octagon',
      href: '/pages/faq/index.html',
    },
    {
      label: 'Emploi/CVthèque',
      icon: 'ti ti-briefcase',
      href: '/pages/jobs/index.html',
    },
    {
      label: 'Petites Annonces',
      icon: 'ti ti-speakerphone',
      href: '/pages/annonce/index.html',
    },
    {
      label: 'Forum',
      icon: 'ti ti-at',
      href: '/pages/forum/index.html',
    }
  ];

  function generateMenu(menuItems) {
    const currentPath = window.location.pathname;

    function createMenuList(items, isSub = false) {
      const ul = document.createElement('ul');
      ul.className = isSub ? 'menu-sub' : 'menu-inner py-1';

      items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'menu-item';

        const hasChildren = item.children && item.children.length > 0;
        const a = document.createElement('a');
        a.className = 'menu-link' + (hasChildren ? ' menu-toggle' : '');
        a.href = item.href || 'javascript:void(0)';

        // Set icon and label
        a.innerHTML = `
          <i class="menu-icon tf-icons ${item.icon}"></i>
          <div>${item.label}</div>
        `;

        // Add active and open classes
        if (item.href && item.href === currentPath) {
          li.classList.add('active');
          let parent = li.closest('.menu-sub');
          while (parent) {
            const parentItem = parent.closest('.menu-item');
            if (parentItem) {
              parentItem.classList.add('open');
            }
            parent = parentItem ? parentItem.closest('.menu-sub') : null;
          }
        }

        li.appendChild(a);

        if (hasChildren) {
          const subMenu = createMenuList(item.children, true);
          li.appendChild(subMenu);

          // If one of the children is active, open the parent
          if (item.children.some(child => child.href === currentPath)) {
            li.classList.add('open');
          }
        }

        ul.appendChild(li);
      });

      return ul;
    }

    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = '';
    menuContainer.appendChild(createMenuList(menuItems));
  }

  document.addEventListener('DOMContentLoaded', () => {
    generateMenu(menuData);
  });