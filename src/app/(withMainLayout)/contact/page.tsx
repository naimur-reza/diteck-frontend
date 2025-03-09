import { ParallaxBanner, SectionTitle } from "@/components/common";
import ContactForm from "./_components/ContactForm";

const Contact = () => {
  return (
    <div>
      <ParallaxBanner
        img={
          "https://demo2.wpopal.com/diteck/wp-content/uploads/2024/11/blog_bc.jpg"
        }
        title="Contact Us"
        pageTitle="Contact"
      />

      <div className="container mx-auto mt-10">
        <SectionTitle
          title="We're ready to help you!"
          buttonText="Get in touch"
        />

        <div className="md:grid grid-cols-5 py-10">
          <div className="col-span-2"></div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
