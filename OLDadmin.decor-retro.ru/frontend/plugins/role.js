import Vue from 'vue'

//for call in components: this.$role[data]
export default ({ app, store, el, vnode }) => {
    Vue.prototype.$role = (data) => {
        const value = data;
        const user = store.getters['auth/user']
        const roles = user.roles;

        if (value && value instanceof Array && value.length > 0) {
            const requiredRoles = value;
            const hasRole = roles.some(role => {
                return requiredRoles.includes(role);
            });

            // if (!hasRole) {
            //     el.parentNode && el.parentNode.removeChild(el);
            // }

            return hasRole
        } else {
            throw new Error(`Roles are required! Example: $role(['Admin','Manager'])`);
        }
    }
}
