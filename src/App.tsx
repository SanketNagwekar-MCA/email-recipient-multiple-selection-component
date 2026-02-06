import { useState } from "react";
import { Card } from "antd";
import EmailRecipientSelect from "./components/email-recipient-select/EmailRecipientSelect";
import type { Recipient } from "./components/email-recipient-select/EmailRecipientSelect";
import "./App.css";

const mockRecipients: Recipient[] = [
  {
    id: "1",
    name: "HR",
    email: "hr@letknowis.com",
    profilePicture: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john.doe@company.com",
    profilePicture: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    profilePicture: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "4",
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    profilePicture: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: "5",
    name: "Sarah Williams",
    email: "sarah.williams@company.com",
    profilePicture: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "6",
    name: "David Brown",
    email: "david.brown@company.com",
  },
  {
    id: "7",
    name: "Emily Davis",
    email: "emily.davis@company.com",
  },
  {
    id: "8",
    name: "Robert Wilson",
    email: "robert.wilson@company.com",
    profilePicture: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: "9",
    name: "Lisa Anderson",
    email: "lisa.anderson@company.com",
    profilePicture: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: "10",
    name: "James Taylor",
    email: "james.taylor@company.com",
  },
  {
    id: "11",
    name: "Marketing Team",
    email: "marketing@company.com",
    profilePicture: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: "12",
    name: "Sales Team",
    email: "sales@company.com",
  },
  {
    id: "13",
    name: "Support",
    email: "support@company.com",
    profilePicture: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: "14",
    name: "Admin",
    email: "admin@company.com",
  },
  {
    id: "15",
    name: "Finance Department",
    email: "finance@company.com",
    profilePicture: "https://i.pravatar.cc/150?img=15",
  },
];

function App() {
  const [ccRecipients, setCcRecipients] = useState<Recipient[]>([]);
  const [bccRecipients, setBccRecipients] = useState<Recipient[]>([]);

  return (
    <div className="app-container">
      <Card className="app-card">
        <div className="recipient-fields">
          <div className="recipient-field">
            <label className="recipient-label">CC Recipient:</label>
            <EmailRecipientSelect
              placeholder="Add CC recipients"
              recipients={mockRecipients}
              value={ccRecipients}
              onChange={setCcRecipients}
            />
          </div>

          <div className="recipient-field">
            <label className="recipient-label">BCC Recipient:</label>
            <EmailRecipientSelect
              placeholder="Add BCC recipients"
              recipients={mockRecipients}
              value={bccRecipients}
              onChange={setBccRecipients}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default App;
