import React from 'react';

const About = () => {
    React.useEffect(() => {
        document.title = 'About Us | Dark Room';
    }, []);

    return (
        <div className="py-12">
            <div className="container-custom max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold text-primary-black mb-8">
                    About Dark Room
                </h1>

                <div className="prose prose-lg max-w-none space-y-6 text-primary-gray-800">
                    <p className="text-xl leading-relaxed">
                        Dark Room exposes the stories others try to hide. We exist to cut through the noise and bring you raw, uncompromising reporting from every dark corner of the globe. Reality needs no filter.
                    </p>

                    <h2 className="text-2xl md:text-3xl font-bold text-primary-black mt-8 mb-4">
                        Our Mission
                    </h2>
                    <p className="leading-relaxed">
                        Our mission is to inform, educate, and empower our readers with quality journalism that matters. We believe in the power of truth and the importance of keeping our community informed about the issues that affect their lives.
                    </p>

                    <h2 className="text-2xl md:text-3xl font-bold text-primary-black mt-8 mb-4">
                        Our Values
                    </h2>
                    <ul className="list-disc list-inside space-y-2 leading-relaxed">
                        <li><strong>Accuracy:</strong> We verify our facts and sources before publishing</li>
                        <li><strong>Independence:</strong> We maintain editorial independence and integrity</li>
                        <li><strong>Transparency:</strong> We are open about our processes and accountable to our readers</li>
                        <li><strong>Diversity:</strong> We represent diverse voices and perspectives</li>
                        <li><strong>Excellence:</strong> We strive for the highest standards in journalism</li>
                    </ul>

                    <h2 className="text-2xl md:text-3xl font-bold text-primary-black mt-8 mb-4">
                        Contact Us
                    </h2>
                    <p className="leading-relaxed">
                        We value your feedback and suggestions. If you have a story tip, comment, or question, please don't hesitate to reach out to us through our contact page.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
