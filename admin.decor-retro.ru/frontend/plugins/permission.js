import Vue from 'vue'

//for call in components: this.$permission[data]
export default ({ app, store, el, vnode }) => {
    Vue.prototype.$permission = (data) => {
        const value = data;
        const user = store.getters['auth/user']
        const permissions = user.permissions;

        if (value && value instanceof Array && value.length > 0) {
            if(value[0] === '*') {
                return true
            }
            const requiredPermissions = value;
            const hasPermission = permissions.some(permission => {
                return requiredPermissions.includes(permission);
            });

            // if (!hasPermission) {
            //     el.parentNode && el.parentNode.removeChild(el);
            // }

            return hasPermission
        } else {
            throw new Error(`Permissions are required! Example: $permission(['user_create','user_update'])`);
        }
    }
}
