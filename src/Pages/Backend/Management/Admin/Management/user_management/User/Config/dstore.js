import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import setup from "./dsetup";
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
            console.log('url', url);
            const response = await axios.get(url, {
                params: {
                    ...qparams
                }
            });
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
        // copy start
    // details data
    [`details_${store_prefix}`]: createAsyncThunk(
        `user/details_${store_prefix}`,
        async (id, thunkAPI) => {
            // console.log(thunkAPI);
            // console.log(id);
            try {
                const response = await axios.get(`/${api_prefix}/details/${id}`);
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
     // copy end

};

const storeSlice = createSlice({
    name: `${store_prefix}`,
    initialState: {
        data: {},
         // copy start
        singleData: {},
         // copy end
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
                state[`data`] = payload;
            })

             // copy start
            .addCase(async_actions[`details_${store_prefix}`].fulfilled, (state, { type, payload, meta }) => {
                // console.log('payload data', payload.data);
                state[`singleData`] = payload.data;
            })
              // copy end
    },
})

export default storeSlice;