export function lookupAddress(artifact, network = 3) {
  let networkId = network
  const deploymentInfo = artifact.networks[networkId]
  if (!deploymentInfo) {
    return `No deployment info found for contract ${artifact.contractName}, network ID ${networkId}.`
  }
  return deploymentInfo
}
