import RestForm from "@/components/pages/restClient/components/restForm/RestForm";
import RestResponse from "@/components/pages/restClient/components/restResponse/RestResponse";

const RestClientPage = (): React.ReactNode => {
  return (
    <section>
      <RestForm />
      <RestResponse />
    </section>
  );
};

export default RestClientPage;
