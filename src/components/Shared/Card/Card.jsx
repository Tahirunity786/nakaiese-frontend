'use client';
import { FiMapPin } from 'react-icons/fi';
import { BiHeart } from 'react-icons/bi';
import TitleComponent from '@/components/Shared/Title/Title';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { useLocale } from 'next-intl';


const Card = ({ data = {}, type="" }) => {
  const router = useRouter();
  const local = useLocale();

  return (
    <div className="flex flex-col relative rounded-lg overflow-hidden shadow-md bg-white">
      <img
        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${type==="room"? data.image:type==="table"?data.images:null}`}
        alt={data.hotel?.name || "Hotel Image"}
        loading="lazy"
        onClick={() => router.push(`${local}/property?type=${type}&SSID=${type==="room"? data.room_id:type==="table"?data.table_id:""}`)}
        className="w-full h-[200px] object-cover cursor-pointer rounded-t-lg"
      />

      <button
        type="button"
        className="absolute top-2.5 right-2.5 w-[35px] h-[35px] rounded-full border-none bg-white flex items-center justify-center shadow-sm hover:bg-red-100 transition-all"
      >
        <BiHeart size={18} color="#dc3545" />
      </button>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <TitleComponent
            title={ type==="room"? data.hotel?.name:type==="table"? data.restaurant?.name:""}
            SSID={type==="room"? data?.room_id:type==="table"? data?.table_id:""}
            type={type}
            url={`/property?type=${type}&id=${type==="room"? data.room_id:type==="table"?data.table_id:""}`}
          />
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {data.is_booked ? "Booked" : "Vacant"}
            </span>
            <h5 className="m-0 text-gray-800">★{data.avg_rating}</h5>
          </div>
        </div>

        <p className="flex items-center gap-1.5 text-gray-600 my-1">
          <FiMapPin />
          {  type==="room"? data.hotel?.city?.name:type==="table"?data.restaurant?.city?.name:""}, { type==="room"? data.hotel?.country:type==="table"?data.restaurant?.country:""}
        </p>

        <p className="text-sm font-bold my-1">
          Persons: <strong>{data.capacity}</strong>
        </p>

        <p className="font-bold text-green-600 text-base">
          ${data.price} / {type}
        </p>
      </div>
    </div>
  );
};

export default memo(Card); // ✅ This line is essential!