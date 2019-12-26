

export function injectFrom( ...serviceNames: string[] ) {
  //

  return (stores: any) => {
    //
    const willInjected: any = {};
    serviceNames.forEach(serviceName => {

      let current = { ...stores };
      const nameSpaces = serviceName.split('.');

      nameSpaces.forEach((nameSpace: string, index: number) => {
        //
        const isLast = index === nameSpaces.length - 1;

        if (isLast) {
          willInjected[nameSpace] = current[nameSpace];
        }

        current = current[nameSpace];
      });

    });

    return willInjected;
  };

}

console.log(injectFrom);
export default {
  injectFrom,
};
