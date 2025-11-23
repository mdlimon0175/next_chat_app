"use client"
import { useSelector } from 'react-redux';

import MicroPhoneIcon from '../utils/ui/icons/MicroPhoneIcon';

export default function CallPartnerUsername() {
    const { partner_info, remote_stream: { audio }} = useSelector(state => state.call) || {};

    return (
        partner_info && (
            <div className="absolute z-40 bottom-4 left-4 text-dawn text-sm bg-black/40 px-2 py-1 rounded">
                <span className='flex'>
                    {partner_info.username}
                    <span className="relative ml-1.5 flex items-center justify-center">
                        <MicroPhoneIcon className={"icon text-dawn"} />
                        <span
                            className={`${
                                audio ? "scale-0" : "scale-100"
                            } absolute rotate-[145deg] w-5 h-[1.5px] top-1/2 left-1/2 -translate-x-1/2 bg-dawn`}
                        ></span>
                    </span>
                </span>
            </div>
        )
    )
}
