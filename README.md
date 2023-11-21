# AWS CDK Bastion Host and RDS Deployment

This project demonstrates how to use AWS Cloud Development Kit (CDK) with TypeScript to deploy a relational database (RDS) instance and a bastion host within an Amazon VPC. The bastion host provides secure access to the RDS instance, which is an essential pattern for managing databases in a secure and controlled manner.

## Project Structure

- `lib/aws-cdk-bastion-host-rds-stack.ts`: Contains the main stack definition for the VPC, RDS instance, bastion host, and associated security groups.
- `bin/aws-cdk-bastion-host-rds.ts`: Entry point for the CDK application.
- `cdk.json`: Configuration file that tells the CDK Toolkit how to execute the app.
- `package.json`: Node.js manifest file, which contains dependencies and build scripts.

## Prerequisites

- AWS Account and AWS CLI configured with appropriate credentials.
- Node.js and npm installed.
- AWS CDK Toolkit installed via npm (`npm install -g aws-cdk`).

## Setup and Deployment

1. **Install Dependencies**: Run `npm install` to install the necessary node modules.

2. **Compile TypeScript to JavaScript**: Execute `npm run build` to compile the TypeScript code to JavaScript.

3. **Deploy the Stack**: Run `npx cdk deploy` to deploy the stack to your default AWS account/region.

## Useful Commands

- `npm run watch`: Watch for changes and compile.
- `npm run test`: Perform the Jest unit tests.
- `npx cdk diff`: Compare deployed stack with current state.
- `npx cdk synth`: Emit the synthesized CloudFormation template.

## Security Considerations

- The bastion host is configured to allow SSH access from any IP address. For production environments, it is recommended to restrict SSH access to known IPs for security.
- The RDS instance is secured within a VPC and only accessible from the bastion host.

## Cleanup

To avoid incurring future charges, remember to delete the resources once you are done:

```bash
npx cdk destroy
```
