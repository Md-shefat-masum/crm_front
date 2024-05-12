import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import setup from "./setup";
// import app_config from "../../../../config/app.config";

var store_prefix = setup.prefix;
var api_prefix = setup.api_prefix;

export const async_actions = {
    // all data
    [`fetch_all_data`]: createAsyncThunk(
        `${store_prefix}/fetch_all_data`,
        async (data, thunkAPI) => {
            console.log('store data', data);
            let state = thunkAPI.getState()[store_prefix];
            let qparams = {
                page_limit: state[`page_limit`],
                // orderByCol: state[`orderByCol`],
                // orderByAsc: state[`orderByAsc`],
                // show_active_data: state[`show_active_data`],
            }
            if(state[`search_key`].length){
                qparams['search_key'] = state[`search_key`]
            }

            let url = data?.url ? data.url : `/${setup.route_prefix}`;
            const response = await axios.get(url, {
                params: {
                    ...qparams
                }
            });
            return response.data;
        }
    ),
    // all user
    [`fetch_all_user`]: createAsyncThunk(
        `${store_prefix}/fetch_all_user`,
        async (data, thunkAPI) => {
            // console.log('store data', data);
            // let state = thunkAPI.getState()[store_prefix];
           

            let url = data?.url ? data.url : `/${setup.route_prefix}/all`;
            const response = await axios.get(url);
            return response.data;
        }
    ),
    // all variants
    [`fetch_all_variants`]: createAsyncThunk(
        `${store_prefix}/fetch_all_variants`,
        async (data, thunkAPI) => {
            console.log('store data', data);
            // let state = thunkAPI.getState()[store_prefix];
           

            let url = data?.url ? data.url : `/task-variant`;
            const response = await axios.get(url);
            return response.data;
        }
    ),
    
    // store data
    [`store_${store_prefix}`]: createAsyncThunk(
        `user/store_${store_prefix}`,
        async (form_data, thunkAPI) => {
            console.log("some form data", form_data);
            try {
                const response = await axios.post(`/${api_prefix}/store`, form_data);
                // thunkAPI.dispatch(storeSlice.actions.my_action())
                // console.log(response.data);
                return response;
            } catch (error) {
                window.render_alert(error)
            }
        }
    ),
    
    // // store task title
    // [`store_${store_prefix}`]: createAsyncThunk(
    //     `user/store_${store_prefix}`,
    //     async (form_data, thunkAPI) => {
    //         console.log("some form data", form_data);
    //         try {
    //             const response = await axios.post(`/${api_prefix}/store`, form_data);
    //             // thunkAPI.dispatch(storeSlice.actions.my_action())
    //             // console.log(response.data);
    //             return response;
    //         } catch (error) {
    //             window.render_alert(error)
    //         }
    //     }
    // ),
        
    // edit data or updated data
    [`edit_${store_prefix}`]: createAsyncThunk(
        `user/edit_${store_prefix}`,
        async (form_data, thunkAPI) => {
            console.log('hoiche');
            try {
                const response = await axios.post(`/${api_prefix}/update`, form_data);
                // thunkAPI.dispatch(storeSlice.actions.my_action())
                // console.log(response);
                return response;
            } catch (error) {
                // console.log(error);
                // console.log(error.response?.data?.data?.keyValue?.[key]);
                // console.log(error.response?.status);
                window.render_alert(error)

            }
        }
    ),
     // details data
     [`details_${store_prefix}`]: createAsyncThunk(
        `user/details_${store_prefix}`,
        async (id, thunkAPI) => {
            let state = thunkAPI.getState()[store_prefix];
            let qparams = {
                page_limit: state[`page_variant_limit`],
            }
            try {
                const response = await axios.get(`/${api_prefix}/details/${id}`, {
                    params: {
                        ...qparams
                    }
                });
                // thunkAPI.dispatch(storeSlice.actions.my_action())
                console.log(response);
                return response;
            } catch (error) {
                // console.log(error);
                // console.log(error.response?.data?.data?.keyValue?.[key]);
                // console.log(error.response?.status);
                return error;

            }
        }
    ),
     // details for edit data
     [`details_edit`]: createAsyncThunk(
        `user/details_edit`,
        async (id, thunkAPI) => {
            try {
                const response = await axios.get(`/${api_prefix}/details/only/${id}`);
                // thunkAPI.dispatch(storeSlice.actions.my_action())
                console.log(response);
                return response;
            } catch (error) {
                // console.log(error);
                // console.log(error.response?.data?.data?.keyValue?.[key]);
                // console.log(error.response?.status);
                return error;

            }
        }
    ),

      // delete data
      [`delete_data`]: createAsyncThunk(
        `${store_prefix}/delete_data`,
        async (id, thunkAPI) => {
            // console.log('from user delete id',id);
            try {
                const response = await axios.post(`/${api_prefix}/delete`, {id} );
                thunkAPI.dispatch(async_actions.fetch_all_data());
                // console.log('response from deltee', response);
                return response;
            } catch (error) {
                return error;
            }
        }
    ),
};

const storeSlice = createSlice({
    name: `${store_prefix}`,
    initialState: {
        data: {},
        user: {},
        singleTask: {},
        variants: {},
        page_limit: 10,
        page_variant_limit: 2,
        search_key: '',
    },
    reducers: {
        set_page_limit: (state, { payload }) => {
            state.page_limit = payload
        },
        set_page_variant_limit: (state, { payload }) => {
            state.page_variant_limit = payload
        },
        set_search_key: (state, { payload }) => {
            state.search_key = payload
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(async_actions[`fetch_all_data`].fulfilled, (state, { type, payload, meta }) => {
                state[`data`] = payload;
            })
            .addCase(async_actions[`fetch_all_user`].fulfilled, (state, { type, payload, meta }) => {
                state[`user`] = payload;
            })
            .addCase(async_actions[`fetch_all_variants`].fulfilled, (state, { type, payload, meta }) => {
                console.log('variants', payload);
                state[`variants`] = payload;
            })
            .addCase(async_actions[`details_${store_prefix}`].fulfilled, (state, { type, payload, meta }) => {
                console.log('payload data', payload);
                state[`singleData`] = payload.data;
            })
            .addCase(async_actions[`details_edit`].fulfilled, (state, { type, payload, meta }) => {
                console.log('payload data', payload);
                state[`singleTask`] = payload.data;
            })
    },
})

export default storeSlice;