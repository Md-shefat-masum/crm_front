let prefix = 'user_work_department';
var setup = {
    prefix,
    route_prefix: 'user-work-department',
    api_prefix: 'user-work-department',
    layout_title: 'user work department management',
    all_page_title: 'All',
    crate_page_title: 'Create',
    edit_page_title: 'Edit',

    dispatch: () => null,
    actions: {
        fetch_all_data: async () => null,
        fetch_all_user_work: async () => null,
        fetch_all_user_work_department: async () => null,
        get_users: async () => null,
        set_page_limit: async () => null,
        set_search_key: async () => null,
        store_data: async () => null,
        update_data: async () => null,
        set_data: async () => null,
        delete_data: async () => null,
        restore_data: async () => null,
    },
}

setup.set_async = function (async_actions, dataStoreSlice) {
    setup.actions.fetch_all_data = async (query_params) => await setup.dispatch(async_actions[`fetch_all_data`](query_params));
    setup.actions.fetch_all_user_work = async (query_params) => await setup.dispatch(async_actions[`fetch_all_user_work`](query_params));
    setup.actions.fetch_all_user_work_department = async (query_params) => await setup.dispatch(async_actions[`fetch_all_user_work_department`](query_params));

    // store user
    setup.actions.store_data = async (form_data) => await setup.dispatch(async_actions[`store_${setup.prefix}`](form_data));

    // delete & restore data
    setup.actions.delete_data = async (id) => await setup.dispatch(async_actions[`delete_data`](id))
    setup.actions.restore_data = async (id) => await setup.dispatch(async_actions[`restore_data`](id))

    // updated data
    setup.actions.update_data = async (form_data) => await setup.dispatch(async_actions[`edit_${setup.prefix}`](form_data))

    setup.actions.get_data = async (id) => await setup.dispatch(async_actions[`details_${setup.prefix}`](id))
    setup.actions.set_page_limit = (limit = 10) => setup.dispatch(dataStoreSlice['actions'][`set_page_limit`](limit));
    setup.actions.set_search_key = (search_key = '') => setup.dispatch(dataStoreSlice['actions'][`set_search_key`](search_key));
}



export default setup;