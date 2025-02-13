import React from 'react';

const AboutHome = () => {
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
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 writing-mode-vertical-rl ml-2 lg:ml-8  text-shadow">
                            匠について
                        </h2>
                        {/* Diamond and Line */}
                        <div className="relative flex flex-col items-center ml-4 lg:ml-20 -mt-8">
                            <div className="w-[6px] h-[6px] rotate-45 origin-center bg-white" />
                            <div className="w-px h-full bg-white" />
                        </div>

                        <div className="text-base lg:text-xl text-gray-200 mb-8 writing-mode-vertical-rl flex flex-col gap-4 lg:gap-12 xl:gap-20 tracking-[0.3em] text-shadow">
                            <p >有田焼は四百年以上の歴史を誇る</p>
                            <p>日本の伝統工芸</p>
                            <p>その美しさと技術を世界に届くため</p>
                            <p>そして次世代へと受け継ぐため</p>
                            <p>匠は熟練の職人と直接連携し</p>
                            <p>一つひとつ丁寧に作られた</p>
                            <p>有田焼をお届けします</p>
                            <p>匠の手から生まれる唯一無二の作品を</p>
                            <p>ぜひお楽しみください</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHome;