import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Form from "../../../components/Form.js";
import { StyledLink } from "../../../components/StyledLink.js";
import useSWRMutation from "swr/mutation";

export default function EditPage() {
  const router = useRouter();
  const { isReady, push } = router;
  const { id } = router.query;
  const { trigger, isMutating } = useSWRMutation(
    `pages/api/places/[id]/index.js`
  );
  const {
    data: place,
    isLoading,
    error,
  } = useSWR(`/api/places/${id}`, editPlace);

  async function editPlace(url, { arg }) {
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(arg),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      await response.json();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }
  async function handleEditPlace(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const placeData = Object.fromEntries(formData);
    await trigger(placeData);
    push("/");
  }
  if (isMutating) {
    return <p>submitting succesfull</p>;
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <h2 id="edit-place">Edit Place</h2>
      <Link href={`/places/${id}`} passHref legacyBehavior>
        <StyledLink justifySelf="start">back</StyledLink>
      </Link>
      <Form
        onSubmit={handleEditPlace}
        formName={"edit-place"}
        defaultData={place}
      />
    </>
  );
}
