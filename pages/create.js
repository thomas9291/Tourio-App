import Link from "next/link.js";
import styled from "styled-components";
import Form from "../components/Form.js";
import { StyledLink } from "../components/StyledLink.js";
/* import useSWR from "swr"; */
import { useRouter } from "next/router.js";

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

export default function CreatePlacePage() {
  const router = useRouter();
  const { push } = router;
  /* const places = useSWR("pages/api/places/index.js"); */
  async function addPlace(place) {
    const response = await fetch("/api/places", {
      method: "POST",
      body: JSON.stringify(place),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      /*  await response.json(); */
      /*  places.mutate(); */

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
      <Form onSubmit={addPlace} formName={"add-place"} />
    </>
  );
}
