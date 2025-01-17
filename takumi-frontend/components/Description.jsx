import React from 'react';

const Description = () => {
    return (
        <section className="relative w-full h-[calc(100dvh-64px)] max-h-[800px] bg-white">
            {/* Content */}
            <div className="relative z-10 w-full min-h-full flex items-center justify-center lg:justify-start flex-row-reverse ">
                <div className="max-w-full px-6 lg:px-20 xl:px-40 py-20">
                    <div className=" flex flex-row-reverse">
                        <h2 className="text-4xl lg:text-5xl font-bold text-[#423023] mb-6 writing-mode-vertical-rl ml-2 lg:ml-8">
                            匠の職人
                        </h2>
                        {/* Diamond and Line */}
                        <div className="relative flex flex-col items-center ml-4 lg:ml-20 -mt-8">
                            <div className="w-[6px] h-[6px] rotate-45 origin-center bg-[#423023]" />
                            <div className="w-px h-full bg-[#423023]" />
                        </div>

                        <div className="text-base lg:text-xl text-[#423023] mb-8 writing-mode-vertical-rl flex flex-col gap-4 lg:gap-12 xl:gap-20">
                            <p>ここは背景を職人が</p>
                            <p>有田焼を製作している風景の動画</p>
                            <p>その上に簡単な紹介文を置く</p>
                            <p>ホバーすると紹介文章が消える</p>
                            <p>動画も明るさ100%に戻る</p>
                            <p>とかどうかな</p>
                            <p>Aboutと同じく文章を縦にしてるけど</p>
                            <p>やっぱ横の方がよかったら教えて</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Description;