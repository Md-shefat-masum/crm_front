import React, { useEffect, useState } from "react";

const MultiselectDropdown = (props) => {

    // console.log(props)
    const ukey = Math.random();
    const [data, setData] = useState([]);
    const [searchdata, searchsetData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [taskOpen, setTaskOpen] = useState(false);
    // const [searchQuery, setSearchQuery] = useState("");

    // useEffect(() => {
    //     setTaskOpen(props.taskOpen)
    //     console.log(taskOpen);
    // }, [props.tasklist]);

    // console.log('user ukey', ukey);

    useEffect(() => {
        setData([...props.data]);
        // console.log(data);

    }, [props.data]);

    useEffect(() => {
        if (props.selectedData?.length) {
            setSelectedData([...props.selectedData]);
        }
    }, [props.selectedData]);

    useEffect(() => {
        props.setSelectedData(selectedData)
        // console.log(selectedData);
    }, [props, selectedData]);

    // console.log(selectedData);
    // console.log(data);
    function addItem(item) {
        // console.log(item);
        let newData = selectedData?.find((i) => i.title === item.title);

        if (newData) {
            // console.log(selectedData);
            // console.log(item.id);
            let uniqueData = selectedData.filter((i) => i.id !== item.id);
            setSelectedData([...uniqueData]);
            // setSelectedData(selectedData.splice(item.id, 0));
        } else {
            let searchData = data.find((i) => i.id === item.id);
            setSelectedData([...selectedData, searchData]);
            // console.log(searchData);
            // console.log(selectedData, setSelectedData([searchData]))
        }
    }

    function removeData(item) {
        let newTotal = selectedData.filter((i) => i.id !== item.id);
        setSelectedData([...newTotal]);
    }

    function handleSearch(event) {
        const value = event.target.value;
        // console.log(value);
        let filteredData = data.filter((i) => i.title.includes(value));
        // console.log(data);
        searchsetData([...filteredData]);
    }

    return (
        <div className="multiselect_dropdown">
            <div className="close_icon">
                {/* <span
                    onClick={() =>
                        document
                            .getElementById("multi_dropdown")
                            .classList.toggle("multiselect_dropdown_hide")
                    }
                    className=" material-symbols-outlined"
                >
                    close
                </span> */}
            </div>
            <div onClick={() => setTaskOpen(true)} className="data_table">
                {/* <select className="d-none" name={props.data.title} value={selectedData.map(i => i._id)} multiple onChange={() => ''}>
                    {data.map((i) => {
                        return (
                            <option key={i._id} value={i._id}>
                                {i.title}
                                
                            </option>
                        );
                    })}
                    
                </select> */}
                {/* <p>open</p> */}
                <ul className="">
                    {selectedData.length
                        ? selectedData.map((i, index) => {
                            return (
                                <div>
                                    <li key={index}>
                                        <span>{i.title}</span>
                                        <span
                                            onClick={() => removeData(i)}
                                            className="material-symbols-outlined border border-1 bg-danger px-1 rounded rounded-3"
                                        >
                                            x
                                        </span>
                                    </li>
                                    {/* <input type="text" name="role" value={i.title} id="" /> */}
                                </div>
                            );
                        })
                        : ""}
                </ul>
            </div>
            {taskOpen && (
                <div className="multiselect_search_and_list">
                    <div id="multi_dropdown" className="multi_dropdown_all">
                        <div className="close_icon">
                            <span
                                onClick={() => setTaskOpen(false)}
                                className=" material-symbols-outlined"
                            >
                                X
                            </span>
                        </div>
                        <div className="multiselect_search">
                            <input
                                onKeyUp={handleSearch}
                                className="form-control"
                                type="search"
                                name=""
                                id=""
                            />
                        </div>
                        <div className="multiselect_list">
                            {searchdata.length ? (
                                <ul>
                                {searchdata.map((i) => {
                                    return (
                                        <li key={i.id}>
                                            <label
                                                htmlFor={"checbox" + i.id + ukey}
                                                className="d-flex gap-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    onChange={() => addItem(i)}
                                                    checked={
                                                        selectedData.find((el) => el.id === i.id)
                                                            ? true
                                                            : false
                                                    }
                                                    id={"checbox" + i.id + ukey}
                                                />
                                                <div className="">{i.title}</div>
                                            </label>
                                        </li>
                                    );
                                })}
                            </ul>
                            ) : (
                                <ul>
                                {data.map((i) => {
                                    return (
                                        <li key={i.id}>
                                            <label
                                                htmlFor={"checbox" + i.id + ukey}
                                                className="d-flex gap-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    onChange={() => addItem(i)}
                                                    checked={
                                                        selectedData.find((el) => el.id === i.id)
                                                            ? true
                                                            : false
                                                    }
                                                    id={"checbox" + i.id + ukey}
                                                />
                                                <div className="">{i.title}</div>
                                            </label>
                                        </li>
                                    );
                                })}
                            </ul>
                            )}
                            {/* <ul>
                                {data.map((i) => {
                                    return (
                                        <li key={i.id}>
                                            <label
                                                htmlFor={"checbox" + i.id + ukey}
                                                className="d-flex gap-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    onChange={() => addItem(i)}
                                                    checked={
                                                        selectedData.find((el) => el.id === i.id)
                                                            ? true
                                                            : false
                                                    }
                                                    id={"checbox" + i.id + ukey}
                                                />
                                                <div className="">{i.title}</div>
                                            </label>
                                        </li>
                                    );
                                })}
                            </ul> */}
                            {/* <button cdata = {selectedData}>tandf</button> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiselectDropdown;