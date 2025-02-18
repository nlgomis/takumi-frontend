import React from 'react';

const DescriptionHome = () => {
    return (
        <section className="relative w-full h-[calc(100dvh-64px)] max-h-[800px] bg-white" id='masters'>
            {/* Content */}
            <div className="relative z-10 w-full min-h-full flex items-center justify-center lg:justify-start flex-row-reverse ">
                <div className="max-w-full px-6 lg:px-20 xl:px-40 py-20">
                    <div className=" flex flex-row-reverse">
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-darkbrown mb-6 writing-mode-vertical-rl ml-2 lg:ml-8  text-shadow">
                            匠の職人
                        </h2>
                        {/* Diamond and Line */}
                        <div className="relative flex flex-col items-center ml-4 lg:ml-20 -mt-8">
                            <div className="w-[6px] h-[6px] rotate-45 origin-center bg-darkbrown" />
                            <div className="w-px h-full bg-darkbrown" />
                        </div>

                    <div className="text-sm sm:text-base lg:text-xl text-darkbrown mb-8 writing-mode-vertical-rl flex flex-col gap-2 sm:gap-8 lg:gap-12 xl:gap-20 tracking-[0.3em]  text-shadow">
                            <p>有田焼の美しさを生み出すのは</p>
                            <p>長年の経験を積んだ熟練の職人たちです</p>
                            <p>伝統的な技法を受け継ぎながらも</p>
                            <p>新たな挑戦を続け</p>
                            <p>一つひとつの作品に魂を込めています</p>
                            <p>細部にまでこだわり抜かれた</p>
                            <p>手仕事から生まれる器</p>
                            <p>職人たちの想いが込められた作品を</p>
                            <p>ぜひ手に取って感じてみてください</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default DescriptionHome;