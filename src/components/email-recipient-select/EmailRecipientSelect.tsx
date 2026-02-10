import { useState } from "react";
import { Select, Avatar, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./EmailRecipientSelect.css";

export interface Recipient {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export interface EmailRecipientSelectProps {
  placeholder?: string;
  recipients: Recipient[];
  value?: Recipient[];
  onChange?: (values: Recipient[]) => void;
}

function EmailRecipientSelect({
  placeholder = "Select or type email address",
  recipients,
  value = [],
  onChange,
}: EmailRecipientSelectProps) {
  const [searchValue, setSearchValue] = useState("");

  // ========== VALIDATION ==========
  // Check if typed text is a valid email format
  const isValidEmail = (text: string) => {
    const atIndex = text.indexOf("@");
    const lastDotIndex = text.lastIndexOf(".");
    return (
      atIndex > 0 && lastDotIndex > atIndex && text.length - lastDotIndex > 2
    );
  };

  // ========== FILTERING ==========
  // Filter recipients based on search text
  const getFilteredRecipients = () => {
    if (!searchValue) return recipients;

    const searchLower = searchValue.toLowerCase();
    return recipients.filter(
      (r) =>
        r.name.toLowerCase().includes(searchLower) ||
        r.email.toLowerCase().includes(searchLower),
    );
  };

  const filteredRecipients = getFilteredRecipients();

  // ========== DROPDOWN OPTIONS ==========
  // Build dropdown list: filtered recipients + custom email option if needed
  const getDropdownOptions = () => {
    const recipientOptions = filteredRecipients.map((recipient) => ({
      label: (
        <div className="email-recipient-option">
          <Avatar
            src={recipient.profilePicture}
            icon={<UserOutlined />}
            size="small"
          />
          <div className="email-recipient-option-content">
            <div className="email-recipient-option-name">{recipient.name}</div>
            <div className="email-recipient-option-email">
              {recipient.email}
            </div>
          </div>
        </div>
      ),
      value: recipient.id,
    }));

    // Add "Use this address" option for custom emails
    const hasNoMatches = filteredRecipients.length === 0;
    const canAddCustomEmail =
      searchValue && hasNoMatches && isValidEmail(searchValue);

    if (canAddCustomEmail) {
      recipientOptions.push({
        label: (
          <div className="email-recipient-option">
            <Avatar icon={<UserOutlined />} size="small" />
            <div className="email-recipient-option-content">
              <div className="email-recipient-option-name">
                Use this address: {searchValue}
              </div>
            </div>
          </div>
        ),
        value: searchValue,
      });
    }

    return recipientOptions;
  };

  // ========== SELECTION HANDLER ==========
  // When user selects/deselects recipients
  const handleChange = (selectedIds: string[]) => {
    const selectedRecipients = [];
    const emailAddresses = [];

    for (const id of selectedIds) {
      // Check if this ID matches a recipient from the list
      const recipient = recipients.find((r) => r.id === id);

      if (recipient) {
        // Existing recipient from the list
        selectedRecipients.push(recipient);
        emailAddresses.push(recipient.email);
      } else {
        // Custom email (ID is the email address itself)
        selectedRecipients.push({ id, name: id, email: id });
        emailAddresses.push(id);
      }
    }

    setSearchValue("");
    console.log(emailAddresses);
    onChange?.(selectedRecipients);
  };

  // ========== RENDER ==========
  return (
    <Select
      mode="multiple"
      allowClear
      style={{ width: "100%" }}
      placeholder={placeholder}
      value={value.map((v) => v.id)}
      onChange={handleChange}
      showSearch={{
        onSearch: setSearchValue,
        searchValue: searchValue,
        filterOption: false,
      }}
      options={getDropdownOptions()}
      tagRender={(props) => {
        const recipient = value.find((v) => v.id === props.value);
        return (
          <Tag closable onClose={props.onClose}>
            {recipient?.email}
          </Tag>
        );
      }}
    />
  );
}

export default EmailRecipientSelect;
