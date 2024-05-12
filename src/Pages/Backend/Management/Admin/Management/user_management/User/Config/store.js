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
            // console.log('data',data , 'thunkapi', thunkAPI);
            let state = thunkAPI.getState()[store_prefix];
            let qparams = {
                page_limit: state[`page_limit`],
                search_key: state[`search_key`],
                // orderByCol: state[`orderByCol`],
                // orderByAsc: state[`orderByAsc`],
                // show_active_data: state[`show_active_data`],
            }

            let url = data?.url ? data.url : `/${store_prefix}`;
            // console.log('url', url);
            const response = await axios.get(url, {
                params: {
                    ...qparams
                },
            });
            return response.data;
        }
    ),
   
    // store data
    [`store_${store_prefix}`]: createAsyncThunk(
        `user/store_${store_prefix}`,
        async (form_data, thunkAPI) => {
            try {
                const response = await axios.post(`/${api_prefix}/store`, form_data);
                return response.data;
            } catch (error) {
                window.render_alert(error)
            }
        }
    ),

    // edit data or updated data
    [`edit_${store_prefix}`]: createAsyncThunk(
        `user/edit_${store_prefix}`,
        async (form_data, thunkAPI) => {
            try {
                const response = await axios.post(`/${api_prefix}/update`, form_data);
                return response.data;
            } catch (error) {
                window.render_alert(error)
            }
        }
    ),
    // details data
    [`details_${store_prefix}`]: createAsyncThunk(
        `user/details_${store_prefix}`,
        async (id, thunkAPI) => {
            try {
                const response = await axios.get(`/${api_prefix}/details/${id}`);
                return response.data;
            } catch (error) {
                return error;

            }
        }
    ),


    // copy ...
    // delete data
    [`delete_data`]: createAsyncThunk(
        `${store_prefix}/delete_data`,
        async (id, thunkAPI) => {
            // console.log('from user delete id',id);
            try {
                const response = await axios.post(`/${api_prefix}/delete`, { id });
                thunkAPI.dispatch(async_actions.fetch_all_data());
                // console.log('response from deltee', response);
                return response;
            } catch (error) {
                return error;
            }
        }
    ),

    // restore data
    [`restore_data`]: createAsyncThunk(
        `${store_prefix}/restore_data`,
        async (id, thunkAPI) => {
            try {
                const response = await axios.post(`/${api_prefix}/restore`, { id });
                thunkAPI.dispatch(async_actions.fetch_all_data());
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
       
        singleData: {},

        page_limit: 10,
        search_key: '',
    },
    reducers: {
        set_page_limit: (state, { payload }) => {
            state.page_limit = payload
        },
        set_search_key: (state, { payload }) => {
            state.search_key = payload
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(async_actions[`fetch_all_data`].fulfilled, (state, { type, payload, meta }) => {
                // console.log('user payload data', payload);
                state[`data`] = payload;
            })
          
            .addCase(async_actions[`details_${store_prefix}`].fulfilled, (state, { type, payload, meta }) => {
                // console.log('payload data', payload.data);
                state[`singleData`] = payload;
            })

    },
})

export default storeSlice;