import React from 'react';

const About = () => {
    return (
        <section className="relative w-full h-[calc(100dvh-64px)] max-h-[800px] bg-black">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full ">
                <img
                    src="images/about1.png"
                    alt="about1"
                    className="w-full lg:w-4/5 h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/15" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full min-h-full flex items-center justify-center lg:justify-start flex-row-reverse ">
                <div className="max-w-full px-6 lg:px-20 xl:px-40 py-20">
                    <div className=" flex flex-row-reverse">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 writing-mode-vertical-rl ml-2 lg:ml-8">
                            匠について
                        </h2>
                        {/* Diamond and Line */}
                        <div className="relative flex flex-col items-center ml-4 lg:ml-20 -mt-8">
                            <div className="w-[6px] h-[6px] rotate-45 origin-center bg-white" />
                            <div className="w-px h-full bg-white" />
                        </div>

                        <div className="text-base lg:text-xl text-gray-200 mb-8 writing-mode-vertical-rl flex flex-col gap-4 lg:gap-12 xl:gap-20">
                            <p>有田焼は日本の伝統文化</p>
                            <p>匠は有田焼を販売するサイト</p>
                            <p>有田焼ものこと</p>
                            <p>匠のことも</p>
                            <p>ここの部分に書くのじゃ</p>
                            <p>縦と横どっちがいいかな</p>
                            <p>縦かっこいいから使ってみたけど</p>
                            <p>横の方がよかったら教えて</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;