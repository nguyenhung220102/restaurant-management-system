"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Steps, ConfigProvider } from "antd";
import {
    CheckCircleFilled
} from "@ant-design/icons";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next-intl/client";
import { useCreateOrder } from "@/app/api/product/order";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Payment() {
    const locale = useLocale();
    const searchParams = useSearchParams()
    const router = useRouter()

    const payMethod = searchParams.get('method')
    const resultCode = searchParams.get('resultCode')
    const { data: session, status } = useSession()
    let current: number = 2;

    const updateOrder = async (orderInfo: any) => {
        await useCreateOrder(session?.user.accessToken, orderInfo, "CASH")
    }

    useEffect(() => {
        var orderInfo = searchParams.get('extraData')
        if (session && orderInfo) {
            let orderInfoJS = Buffer.from(orderInfo, "base64").toString()
            orderInfoJS = JSON.parse(orderInfoJS)
            updateOrder(orderInfoJS)
            router.push('/payment?method=MOMO&resultCode=0')
        }
    }, [session])

    if (payMethod == "MOMO") {
        if (resultCode == "0") {
            current = 3
        }
        else {
            router.push('/order')
            return
        }
    }

    const steps = [
        {
            title: "CART",
        },
        {
            title: "ORDER",
        },
        {
            title: "PAYMENT",
        },
    ];
    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    return (
        <div className='flex flex-col lg:flex-row justify-between gap-5 p-10'>
            <div className='flex flex-col justify-between gap-5 w-full'>
                <div className='w-full h-auto p-10 rounded-3xl bg-primary-white'>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: "#EA6A12",
                                colorText: "#EA6A12",
                                colorPrimaryBorder: "rgb(251, 146, 60)",
                                colorSplit: "rgb(255, 247, 237)",
                                fontWeightStrong: 600,
                            },
                        }}
                    >
                        <Steps className='' current={current} items={items} />
                    </ConfigProvider>
                </div>
                <div className='w-full h-auto p-10 rounded-3xl bg-primary-white'>
                    <div className='w-full h-auto flex flex-col justify-center items-center gap-5 p-8 bg-primary-white rounded-3xl transition-all duration-300'>
                        <div className='w-auto h-auto rounded-lg overflow-hidden text-primary'>
                            <CheckCircleFilled
                                style={{
                                    fontSize: "5rem",
                                }}
                            />
                        </div>
                        <span className='font-extrabold text-xl'>
                            ORDER SUCCESSFULLY
                        </span>
                        <Link
                            href={"/#"}
                            locale={locale}
                            className='p-2 px-10 w-auto h-auto rounded-lg font-extrabold text-lg border-orange-500 border-2 hover:bg-primary-400 bg-primary text-item-white transition-all duration-300 flex justify-center'
                        >
                            View order
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
