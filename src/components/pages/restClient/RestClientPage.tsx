import RestForm from "@/components/restForm/RestForm";
import RestResponse from "@/components/restResponse/RestResponse";

const RestClientPage = (): React.ReactNode => {
  return (
    <section>
      <RestForm />
      <RestResponse />
    </section>
  );
};

export default RestClientPage;
