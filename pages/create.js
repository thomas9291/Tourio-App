import Link from "next/link.js";
import styled from "styled-components";
import Form from "../components/Form.js";
import { StyledLink } from "../components/StyledLink.js";
import useSWR from "swr";
import { useRouter } from "next/router.js";

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

export default function CreatePlacePage() {
  const router = useRouter();
  const { push } = router;
  const places = useSWR("pages/api/places/index.js");
  async function addPlace(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const placeData = Object.fromEntries(formData);

    const response = await fetch("pages/api/places/index.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(placeData),
    });
    if (response.ok) {
      await response.json();
      places.mutate();
      event.target.reset();
      push("/");
    } else {
      console.error(response.status);
    }
  }

  return (
    <>
      <h2 id="add-place">Add Place</h2>

      <Link href="/" passHref legacyBehavior>
        <StyledBackLink>back</StyledBackLink>
      </Link>
      <Form
        onSubmit={addPlace}
        formName={"add-place"}
        defaultData={"add-place"}
      />
    </>
  );
}
