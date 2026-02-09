# @sanketnagwekar/email-lookahead

A React email recipient selection component with lookahead/autocomplete functionality built with Ant Design.

## Features

- **Smart Search** - Filter recipients by name or email as you type
- **Custom Emails** - Allow users to type email addresses not in your list
- **Rich Display** - Show profile pictures and recipient details
- **Clean UI** - Built with Ant Design components
- **TypeScript** - Full TypeScript support with type definitions
- **Reusable** - Works for CC, BCC, or any recipient field
- **Zero Config** - Styles included automatically, no separate CSS import needed

## Installation

```bash
npm install @sanketnagwekar/email-lookahead
```

**Peer Dependencies:**

```bash
npm install react react-dom antd
```

## Quick Start

```tsx
import { EmailRecipientSelect } from "@sanketnagwekar/email-lookahead";

function App() {
  const recipients = [
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
  ];

  return (
    <EmailRecipientSelect
      placeholder="Add recipients"
      recipients={recipients}
      onChange={(selected) => console.log(selected)}
    />
  );
}
```

## Complete Example

```tsx
import { useState } from "react";
import {
  EmailRecipientSelect,
  Recipient,
} from "@sanketnagwekar/email-lookahead";

function EmailForm() {
  const [ccRecipients, setCcRecipients] = useState<Recipient[]>([]);
  const [bccRecipients, setBccRecipients] = useState<Recipient[]>([]);

  // Your list of available recipients
  const availableRecipients: Recipient[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      profilePicture: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      profilePicture: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: "3",
      name: "HR Team",
      email: "hr@company.com",
    },
  ];

  const handleCcChange = (selected: Recipient[]) => {
    setCcRecipients(selected);
    console.log(
      "CC Recipients:",
      selected.map((r) => r.email),
    );
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <label>CC Recipients:</label>
        <EmailRecipientSelect
          placeholder="Add CC recipients"
          recipients={availableRecipients}
          value={ccRecipients}
          onChange={handleCcChange}
        />
      </div>

      <div>
        <label>BCC Recipients:</label>
        <EmailRecipientSelect
          placeholder="Add BCC recipients"
          recipients={availableRecipients}
          value={bccRecipients}
          onChange={setBccRecipients}
        />
      </div>
    </div>
  );
}
```

## How It Works

1. **Search & Filter** - Start typing to filter recipients by name or email
2. **Select from List** - Click on any recipient to add them
3. **Custom Email** - Type a complete email (e.g., `user@domain.com`) and it will show "Use this address" option
4. **View Selected** - Selected emails appear as tags that can be removed by clicking the × icon
5. **Get Results** - The `onChange` callback receives an array of selected recipients

## API

### Props

| Prop          | Type                                | Required | Default                          | Description                                |
| ------------- | ----------------------------------- | -------- | -------------------------------- | ------------------------------------------ |
| `placeholder` | `string`                            | No       | `'Select or type email address'` | Placeholder text shown when empty          |
| `recipients`  | `Recipient[]`                       | Yes      | -                                | Array of available recipients to show      |
| `value`       | `Recipient[]`                       | No       | `[]`                             | Currently selected recipients (controlled) |
| `onChange`    | `(recipients: Recipient[]) => void` | No       | -                                | Callback when selection changes            |

### Recipient Type

```typescript
interface Recipient {
  id: string; // Unique identifier
  name: string; // Display name
  email: string; // Email address
  profilePicture?: string; // Optional profile picture URL
}
```

## Styling

The component uses Ant Design's styling system. You can override styles using CSS:

```css
/* Override dropdown option styles */
.email-recipient-option {
  padding: 12px !important;
}

/* Override selected tag styles */
.ant-select-selection-item {
  background-color: #1890ff !important;
  color: white !important;
}
```

## License

MIT

## Author

Sanket Nagwekar

## Links

- [NPM Package](https://www.npmjs.com/package/@sanketnagwekar/email-lookahead)
- [GitHub Repository](https://github.com/SanketNagwekar-MCA/email-recipient-multiple-selection-component)
