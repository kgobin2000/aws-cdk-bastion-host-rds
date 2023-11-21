
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCdkBastionHostRdsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a VPC
    const vpc = new ec2.Vpc(this, 'VPC', {
      maxAzs: 3 // Default is all AZs in the region
    });

    // Create a security group for the RDS instance
    const rdsSecurityGroup = new ec2.SecurityGroup(this, 'RDSSecurityGroup', {
      vpc,
      description: 'Allow access to RDS from the bastion host',
      allowAllOutbound: true   // Can be set to false
    });

    // Create an RDS instance
    const dbInstance = new rds.DatabaseInstance(this, 'Instance', {
      engine: rds.DatabaseInstanceEngine.mysql({
        version: rds.MysqlEngineVersion.VER_8_0_19
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO
      ),
      vpc,
      securityGroups: [rdsSecurityGroup]
    });

    // Create a bastion host
    const bastion = new ec2.BastionHostLinux(this, 'BastionHost', {
      vpc,
      subnetSelection: { subnetType: ec2.SubnetType.PUBLIC }
    });

    // Allow SSH access to bastion from anywhere
    // Note: For production, restrict this to known IPs
    bastion.allowSshAccessFrom(ec2.Peer.anyIpv4());

    // Allow the bastion to connect to the RDS instance
    rdsSecurityGroup.addIngressRule(
      ec2.Peer.ipv4(bastion.instancePublicIp + '/32'),
      ec2.Port.tcp(3306),
      'Allow MySQL access from the bastion host'
    );
  }
}

