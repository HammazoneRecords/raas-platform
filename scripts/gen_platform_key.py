#!/usr/bin/env python3
"""Generate ed25519 deploy keypair for raas-platform (no ssh-keygen in sandbox)."""
import os
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey
from cryptography.hazmat.primitives import serialization

KEY = os.path.expanduser("~/.ssh/raas_platform_deploy")
os.makedirs(os.path.dirname(KEY), exist_ok=True)

key = Ed25519PrivateKey.generate()
priv = key.private_bytes(
    serialization.Encoding.PEM,
    serialization.PrivateFormat.OpenSSH,
    serialization.NoEncryption(),
)
pub = key.public_key().public_bytes(
    serialization.Encoding.OpenSSH,
    serialization.PublicFormat.OpenSSH,
)
with open(KEY, "wb") as f:
    f.write(priv)
os.chmod(KEY, 0o600)
with open(KEY + ".pub", "wb") as f:
    f.write(pub)

print(pub.decode())
