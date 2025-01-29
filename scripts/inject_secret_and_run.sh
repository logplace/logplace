#!/bin/sh

check_env_var() {
    if [ -z "${!1}" ]; then
        echo "Error: $1 is not set"
        exit 1
    fi
}

# List of required environment variables
required_vars="
INFISICAL_MACHINE_CLIENT_ID
INFISICAL_MACHINE_CLIENT_SECRET
PROJECT_ID
INFISICAL_SECRET_ENV
"

# Check all required environment variables
for var in $required_vars; do
    if [ -z "$(eval echo \$$var)" ]; then
        echo "Error: $var is not set"
        exit 1
    fi
done

# Check if a command was provided as an argument
if [ -z "$1" ]; then
    echo "Error: No command provided"
    echo "Usage: $0 \"<command>\""
    exit 1
fi

# Get Infisical token
export INFISICAL_TOKEN=$(infisical login --method=universal-auth --client-id=$INFISICAL_MACHINE_CLIENT_ID --client-secret=$INFISICAL_MACHINE_CLIENT_SECRET --plain --silent)

if [ -z "$INFISICAL_TOKEN" ]; then
    echo "Error: Failed to obtain Infisical token"
    exit 1
fi

# Log successful environment validation
echo "All required environment variables are set"
echo "Starting application with command: $1"

# Execute the command with Infisical
exec infisical run \
    --token "$INFISICAL_TOKEN" \
    --projectId "$PROJECT_ID" \
    --env "$INFISICAL_SECRET_ENV" \
    --command "$1"
