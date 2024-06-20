import { withIronSessionSsr } from 'iron-session/next';
import { plaidClient, sessionOptions } from '../lib/plaid';

export default function Test() {
    return (
        <div>
            <h1>Test page</h1>
        </div>
    );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const access_token = req.session.access_token;

    if (!access_token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const response = await plaidClient.accountsBalanceGet({ access_token });
    return {
      props: {
        balance: response.data,
      },
    };
  },
  sessionOptions
);
