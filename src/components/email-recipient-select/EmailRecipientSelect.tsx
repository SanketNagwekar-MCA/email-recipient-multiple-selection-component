import { useState } from "react";
import { Select, Avatar } from "antd";
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

  // Check if email is valid (has @ and domain like .com, .in with 2+ characters)
  const isValidEmail = (text: string) => {
    const atIndex = text.indexOf("@");
    const lastDotIndex = text.lastIndexOf(".");
    return (
      atIndex > 0 && lastDotIndex > atIndex && text.length - lastDotIndex > 2
    );
  };

  // Filter recipients by search
  const filteredRecipients = !searchValue
    ? recipients
    : recipients.filter(
        (r) =>
          r.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          r.email.toLowerCase().includes(searchValue.toLowerCase()),
      );

  // Create dropdown options
  const options = [
    ...filteredRecipients.map((recipient) => ({
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
    })),
    // Add "Use this address" if valid email format and no matches
    ...(searchValue &&
    filteredRecipients.length === 0 &&
    isValidEmail(searchValue)
      ? [
          {
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
            value: `custom-${searchValue}`,
          },
        ]
      : []),
  ];

  // Handle selection
  const handleChange = (selectedIds: string[]) => {
    const selectedRecipients = [];
    const emailAddresses = [];

    for (const id of selectedIds) {
      if (id.startsWith("custom-")) {
        const email = id.replace("custom-", "");
        selectedRecipients.push({ id, name: email, email });
        emailAddresses.push(email);
      } else {
        const recipient = recipients.find((r) => r.id === id);
        if (recipient) {
          selectedRecipients.push(recipient);
          emailAddresses.push(recipient.email);
        }
      }
    }

    setSearchValue("");
    console.log(emailAddresses);
    onChange?.(selectedRecipients);
  };

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
      options={options}
      tagRender={(props) => {
        const recipient = value.find((v) => v.id === props.value);
        return (
          <span className="ant-select-selection-item">
            <span className="ant-select-selection-item-content">
              {recipient?.email}
            </span>
            <span
              className="ant-select-selection-item-remove"
              onClick={props.onClose}
            >
              ×
            </span>
          </span>
        );
      }}
    />
  );
}

export default EmailRecipientSelect;
