# WebRTC Connection Setup Guide

WebRTC enables real-time communication between devices over the Internet. Establishing a successful WebRTC connection involves the coordination of ICE (Interactive Connectivity Establishment) servers and SDP (Session Description Protocol) negotiation.

## ICE Servers

ICE servers are crucial, especially when devices are separated by NATs or firewalls. They facilitate the connection between devices over the Internet. The ICE process involves discovering and connecting devices through various network paths, including local, reflexive, and relay candidates.

### Usage

- Your browser makes STUN-binding requests to the server URL passed over the `RTCPeerConnection` constructor.
- STUN servers help in checking the connection's active status and ensure that ports or relaying servers are not dropped.
- If testing between two tabs or computers connected to the same LAN, HOST addresses are used, and no external STUN/TURN server is required.

## SDP Negotiation

SDP negotiation is responsible for establishing the parameters of a multimedia session between devices. When two devices attempt to establish a WebRTC connection, they exchange SDP messages to negotiate media formats, transport protocols, and other essential details.

### Role of SDP

- Negotiating media session details such as codecs, formats, and transport protocols.
- Enabling successful connections by exchanging SDP messages between devices.

## Getting Started

To set up a WebRTC connection:

1. **ICE Servers:**
   - Configure STUN server URLs in the `iceServers` property of `RTCPeerConnection`.
   - Consider using external STUN/TURN servers when devices are separated by NATs or firewalls.

2. **SDP Negotiation:**
   - Create and exchange SDP messages during the signaling process.
   - Use SDP to describe multimedia sessions and negotiate connection parameters.

3. **Testing:**
   - If testing between local environments (e.g., two tabs or computers on the same LAN), HOST addresses suffice without external STUN/TURN servers.

## Example Code

Check the provided example code in this repository for a basic WebRTC setup.

![WebRTC Workflow](webRTC%20uml-diagram.png)

Feel free to explore further and customize your WebRTC implementation based on specific requirements.

Happy Coding!
