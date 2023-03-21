let cancelCallback = () => {};

const sleep = (period: number) => {
  return new Promise((resolve) => {
    cancelCallback = () => {
      console.log("Canceled");
      return resolve("Canceled");
    };
    setTimeout(() => {
      resolve("tick");
    }, period);
  });
};

const poll = async ({
  callFn,
  period,
  condition,
}: {
  callFn: () => Promise<void>;
  period: number;
  condition: () => boolean;
}) => {
  console.log("running");
  await callFn();

  let asleep = async (period: any) => {
    let response = await sleep(period);
    return response;
  };

  console.log(condition());

  if (condition()) {
    console.log("Canceling...");
    return cancelCallback();
  }

  asleep(period).then((response) => {
    if (response !== "Canceled") {
      poll({ callFn, period, condition });
    }
  });
};

export default poll;
