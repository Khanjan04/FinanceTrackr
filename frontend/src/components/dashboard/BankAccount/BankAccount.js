import { useSelector } from "react-redux";

export default function BankAccount() {
  const title_heading = useSelector((state) => state.header.title);

  return (
    <>
      {(() => {
        switch (title_heading) {
          case "bank_accounts":
            return (
              <div>
                <h3>Bank Account</h3>
              </div>
            );
        }
      })()}
    </>
  );
}

