export const getPumpCoinInfoByAve = async (tokenAddress: string) => {
  const res = await fetch(
    `https://febweb002.com/v1api/v3/tokens/${tokenAddress}-solana`,
    {
      headers: {
        "X-Auth": `0fc1d6d628fc8a60842fc76dcd6591ae1739285262564287337`,
      },
    }
  );
  const data = await res.json();
  return data;
};
