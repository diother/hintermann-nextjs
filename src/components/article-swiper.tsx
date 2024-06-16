"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export default function ArticleSwiper({ images }: { images: string[] }) {
    if (images.length === 1) {
        return (
            <Image
                className="mt-10 w-full rounded-md"
                src={images[0] as string}
                width="510"
                height="340"
                alt="Article image"
                priority={true}
            />
        );
    }
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            lazyPreloadPrevNext={1}
            navigation={{
                nextEl: ".button-next",
                prevEl: ".button-prev",
                disabledClass: "disabled",
            }}
            pagination={{ clickable: true }}
            spaceBetween={50}
            slidesPerView={1}
            className={`mt-10 rounded-md [&_.disabled]:opacity-45 [&_.swiper-pagination-bullet-active]:bg-white [&_.swiper-pagination-bullet]:bg-white`}
        >
            {images.map((image, index) => (
                <SwiperSlide key={image} className="cursor-grab">
                    <Image
                        className="w-full"
                        src={image as string}
                        width="510"
                        height="340"
                        alt={`Article image ${index}`}
                        priority={index === 0}
                    />
                </SwiperSlide>
            ))}
            <Button
                variant="secondary"
                slot="container-end"
                className="button-prev absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-xl transition sm:h-12 sm:w-12 lg:h-14 lg:w-14"
            >
                <ArrowLeft className="shrink-0" />
            </Button>
            <Button
                variant="secondary"
                slot="container-end"
                className="button-next absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-xl transition sm:h-12 sm:w-12 lg:h-14 lg:w-14"
            >
                <ArrowRight className="shrink-0" />
            </Button>
        </Swiper>
    );
}
