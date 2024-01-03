import '@/styles/globals.css'
import { QueryClient, QueryClientProvider} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import {NextUIProvider} from "@nextui-org/react";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <NextUIProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          <Component {...pageProps} />
        </NextUIProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
