import GraphiForm from "@/components/graphiForm/GraphiForm";
import GraphiResponse from "@/components/graphiResponse/GraphiResponse";

const GraphiClientPage = (): React.ReactNode => {
  return (
    <section>
      <GraphiForm />
      <GraphiResponse />
    </section>
  );
};

export default GraphiClientPage;
