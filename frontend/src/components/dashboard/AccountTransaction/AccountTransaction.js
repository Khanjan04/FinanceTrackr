import { useSelector } from "react-redux";

export default function AccountTransaction() {
  const title_heading = useSelector((state) => state.header.title);

  return (
    <>
      {(() => {
        switch (title_heading) {
          case "bank_accounts":
            return (
              <div>
                <h3>Account Transaction</h3>
              </div>
            );
        }
      })()}
    </>
  );
}

