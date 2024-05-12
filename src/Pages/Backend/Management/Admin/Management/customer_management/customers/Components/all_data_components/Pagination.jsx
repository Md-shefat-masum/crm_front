import { useSelector, useDispatch } from 'react-redux'
import setup from '../../Config/setup';
import parse from 'html-react-parser';

function Pagination() {
    const data_store = useSelector((state) => state[setup.prefix]);
    // setup.set_async(async_actions, dataStoreSlice);
    setup.dispatch = useDispatch();
    const { fetch_all_data, set_page_limit } = setup.actions;

    return (
        <>
            <div className="d-inline-block">
                <ul className="pagination pagination-sm">
                    {
                        data_store.data?.links?.map(item => {
                            return <li key={item.label} className="page-item pagination-page-nav">
                                <a onClick={(e) => { e.preventDefault(); !item.active && fetch_all_data({ url: item.url }) }}
                                    href={item.url}
                                    className={`page-link ${item.active ? 'active' : ''} `}>
                                    {parse(item.label)}
                                </a>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className="show-limit d-inline-block">
                <span>Limit:</span>
                <select onChange={(e) => { set_page_limit(e.target.value); fetch_all_data(); }}>
                    <option value="10">
                        10
                    </option>
                    <option value="5">
                        5
                    </option>
                    <option value="25">
                        25
                    </option>
                    <option value="50">
                        50
                    </option>
                    <option value="100">
                        100
                    </option>
                </select>
            </div>
            <div className="show-limit d-inline-block">
                <span>Total:</span>
                <span>
                    {data_store?.data?.total}
                </span>
            </div>
        </>
    )
}

export default Pagination