import ContactCard from "./ContactCard";

export default function ContactsCardContainer({
  contacts,
  handleOnDelete,
  handleOnEdit,
}) {
  return (
    <div>
      {contacts.map((contactItem) => (
        <ContactCard
          key={contactItem._id}
          {...contactItem}
          handleOnDelete={handleOnDelete}
          handleOnEdit={handleOnEdit}
        />
      ))}
    </div>
  );
}
