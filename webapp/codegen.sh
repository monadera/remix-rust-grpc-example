#!/bin/sh

mkdir -p app/api/generated

GENERATED_CODE_DIR=./app/api/generated
PROTO_DIR=../api/protos

./node_modules/.bin/grpc_tools_node_protoc \
  --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto \
  --ts_proto_out=$GENERATED_CODE_DIR \
  --ts_proto_opt=outputServices=nice-grpc,outputServices=generic-definitions,useExactTypes=false,esModuleInterop=true,importSuffix=.js \
  --proto_path=$PROTO_DIR \
  $PROTO_DIR/*.proto