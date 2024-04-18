"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    ConfigProvider,
    Table,
    Select,
    Alert,
} from "antd";
import { TableProps, GetProp } from "antd";
import { variables } from "@/app";
import {
    SortAscendingOutlined,
    SortDescendingOutlined,
    FormOutlined,
    CloseSquareOutlined,
    PlusCircleOutlined
} from "@ant-design/icons";
import type {
    Key,
    SortOrder,
} from "antd/es/table/interface";
import { Modal } from "antd";
import { useRouter } from "next-intl/client";;
import fetchClient from "@/lib/fetch-client";
import CreateCategory from "./create";

type ColumnsType<T> = TableProps<T>["columns"];
type TablePaginationConfig = Exclude<
    GetProp<TableProps, "pagination">,
    boolean
>;
interface DataType {
    key: React.Key;
    id: number;
    name: string;
    description: string;
    thumnails: string;
    action: string;
}



type ErrorType = {
    isError: boolean;
    title: string;
    message: string;
};

type SorterParams = {
    field?: Key | readonly Key[];
    order?: SortOrder;
};

interface TableParams {
    pagination?: TablePaginationConfig;
    sorter?: SorterParams;
    filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

type DataIndex = keyof DataType;

const Category = () => {

    const [data, setData] = useState<DataType[]>();
    const [rawData, setRawData] = useState<any[]>();
    const [loading, setLoading] = useState(false);
    const [isCreate, setIsCreate] = useState(false)
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        },
        filters: {},
        sorter: {
            field: "id",
            order: "ascend",
        },
    });
    const [isSorting, setIsSorting] = useState(true)
    const list_sort = [
        {
            key: "id",
            title: "ID"
        },
        {
            key: "name",
            title: "Name"
        },
    ]
    const [error, setError] = useState<ErrorType>({
        isError: false,
        message: "",
        title: "",
    });

    const rowSelection = {
        // onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        //     setSelectedOrders(selectedRows);
        // },
        // getCheckboxProps: (record: DataType) => ({
        //     disabled: record.fullname === "",
        //     name: record.fullname,
        // }),
    };

    const columns: ColumnsType<DataType> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",

        },
        {
            title: "Icon",
            dataIndex: "thumnails",
            key: "thumnails",

        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (text, row) => <>
                <button><FormOutlined style={{ color: "#4A58EC", fontSize: "18px" }} /></button>
                <button><CloseSquareOutlined className="ml-2" style={{ color: "#DB3A34", fontSize: "18px" }} /></button>
            </>
        }
    ];


    const handleTableChange: TableProps["onChange"] = (
        pagination,
        filters,
        sorter,
        extra
    ) => {
    };

    const handleSortFieldChange = (key: string) => {
        setTableParams((prev) => ({
            ...prev,
            sorter: { ...prev.sorter, field: key },
        }));
        setIsSorting((current) => !current)
    };

    const handleToggleSorter = () => {
        setTableParams((prev) => ({
            ...prev,
            sorter: {
                ...prev.sorter,
                order: prev.sorter?.order === "ascend" ? "descend" : "ascend",
            },
        }));
        setIsSorting((current) => !current)
    };

    const handleClearAll = () => {
        setTableParams((prev) => ({
            ...prev,
            sorter: {
                field: "id",
                order: "ascend",
            },
        }));
        setIsSorting((current) => !current)
    };

    const handleCloseError = () => {
        console.log(error);
        setError({ isError: false, title: "", message: "" });
    };

    const fetchData = async (sort = false) => {
        setLoading(true);
        try {
            let filterQueriesStr = "";
            for (const key in tableParams.filters) {
                filterQueriesStr = `${filterQueriesStr}&${key}=${tableParams.filters[key]}`;
            }
            let url = ""
            if (sort) {
                const sort_factor = tableParams.sorter?.field
                const order = tableParams.sorter?.order
                url = `/customers/opportunity/all?sort_factor=${sort_factor}&order=${order}`
            }
            else {
                url = "/categories/all"
            }

            const response = await fetchClient({
                url: url, data_return: true
            })

            setRawData(response)
            const results = response
            const data = results.map((item: any, index: any) => ({
                id: item.id,
                name: item.name,
                description: item.description,
                thumnails: item.thumnails
            }));
            setData(data);
            console.log(data)
            setLoading(false);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    pageSize: results.pageSize,
                    current: results.page,
                    total: results.totalCount,
                },
            });


        } catch (error: any) {
            setLoading(false)
            console.log(error);
            setError({
                isError: true,
                title: error?.name || "Something went wrong!",
                message: error?.message || "Unknown error",
            });
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    // useEffect(() => {
    //     setTableParams({
    //         ...tableParams,
    //         pagination: {
    //             current: 1,
    //             pageSize: 10,
    //             total: 0,
    //         }
    //     });

    //     fetchData(true)
    // }, [isSorting])

    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            headerBg: variables.backgroundSecondaryColor,
                            footerBg: "#fff",
                        },
                    },
                }}
            >
                <div className='w-full flex flex-col justify-start gap-5'>
                    {/* <CustomerFilterBar /> */}
                    {error.isError && (
                        <Alert
                            message={error.title}
                            description={error.message}
                            type='error'
                            showIcon
                            onClose={handleCloseError}
                            closeIcon
                        />
                    )}
                    <div className='border bg-white shadow p-3 w-full'>
                        <div className="flex justify-between">
                            <div
                                style={{ marginBottom: 0 }}
                                className='flex items-center gap-2'
                            >
                                <p>Sort by: </p>
                                <Select
                                    // style={{ width: '20%' }}
                                    placeholder='Columns'
                                    value={
                                        tableParams.sorter?.field?.toString() ||
                                        "id"
                                    }
                                    onChange={handleSortFieldChange}
                                    options={list_sort.map((item) => ({
                                        value: item.key,
                                        label: item.title,
                                    }))}
                                />

                                <p>Order: </p>

                                <Button
                                    onClick={handleToggleSorter}
                                    icon={
                                        tableParams.sorter?.order === "ascend" ? (
                                            <SortAscendingOutlined />
                                        ) : (
                                            <SortDescendingOutlined />
                                        )
                                    }
                                />
                                <Button onClick={handleClearAll}>
                                    Clear sorters
                                </Button>
                            </div>

                            <div>
                                <Button icon={<PlusCircleOutlined />} onClick={() => setIsCreate(true)}>
                                    New
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-auto'>
                        <Table
                            rowSelection={{
                                ...rowSelection,
                            }}
                            columns={columns}
                            pagination={{
                                className: "bg-white rounded px-4 py-2",
                                showTotal: (total: number) =>
                                    `Total ${total} items`,
                                position: ["bottomCenter", "bottomRight"],
                                showSizeChanger: true,
                                showQuickJumper: true,
                                total: tableParams.pagination?.total,
                                pageSize: tableParams.pagination?.pageSize,
                            }}
                            loading={loading}
                            dataSource={data}
                            onChange={handleTableChange}
                        />
                    </div>
                </div>
            </ConfigProvider>

            <CreateCategory isCreate={isCreate} setIsCreate={setIsCreate} />
        </>
    )
}

export default Category