const Handlebars = require('handlebars');
const moment = require('moment');

module.exports = {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';

        const icons = {
            default: 'fa-solid fa-sort',
            asc: 'fa-solid fa-arrow-down-short-wide',
            desc: 'fa-solid fa-arrow-down-wide-short'
        };
        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc'
        };

        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href="?_sort&column=${field}&type=${type}">
                     <i class="${icon}" style="color: #1E3050"></i>
                </a>`;
    },
    truncate: (str, len) => {
        if (str.length > len) {
            return str.substring(0, len) + '...';
        }
        return str;
    },

    formatTime: (time) => {
        return moment(time).format('MMMM DD YYYY, HH:mm:ss');
    }
};

// Registering the helper globally (if needed in your setup)
Handlebars.registerHelper('truncate', module.exports.truncate);
