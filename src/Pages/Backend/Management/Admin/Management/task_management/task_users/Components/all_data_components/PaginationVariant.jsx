import { useSelector, useDispatch } from 'react-redux'
import setup from '../../Config/setup';
import dataStoreSlice, { async_actions } from '../../Config/store';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';

function PaginationVariant() {
    const { id } = useParams();
    // const data_store = useSelector((state) => state[setup.prefix]);
    const data_store = useSelector((state) => state[setup.prefix]["singleData"])
    setup.set_async(async_actions, dataStoreSlice);
    setup.dispatch = useDispatch();
    const { get_users,set_page_variant_limit } = setup.actions;
    console.log('iddd', id);
    console.log('iddd', data_store);
    return (
        <>
            <div className="d-inline-block">
                <ul className="pagination pagination-sm">
                    {
                        data_store?.links?.map(item => {
                            return <li key={item.label} className="page-item pagination-page-nav">
                                <a onClick={(e) => { e.preventDefault(); !item.active && get_users(id); }}
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
                <select onChange={(e) => { set_page_variant_limit(e.target.value); get_users(id);; }}>
                    <option value="1">
                        1
                    </option>
                    <option value="5">
                        5
                    </option>
                    <option value="10">
                        10
                    </option>
                    <option value="25">
                        25
                    </option>
                    <option value="50">
                        50
                    </option>
                </select>
            </div>
            <div className="show-limit d-inline-block">
                <span>Total:</span>
                <span>
                    {data_store?.total}
                </span>
            </div>
        </>
    )
}

export default PaginationVariant